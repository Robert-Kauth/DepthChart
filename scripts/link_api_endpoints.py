"""Link the frontend and Flask backend in the graphify knowledge graph.

graphify only records relationships within one language, so the React
frontend (frontend/src) and the Flask API (app/) end up as disconnected
islands: they only meet over HTTP and socket.io. This script adds one
endpoint node per API contract (e.g. "POST /api/servers/") and links it:

    frontend function --references--> endpoint <--implements-- Flask handler

Frontend sites come from fetch() calls and socket.emit/on; backend sites
come from @<blueprint>.route decorators (prefixed via register_blueprint
in app/app.py) and @sio.on handlers. Matching is by HTTP method plus URL
pattern, with path parameters normalized so `${id}` matches `<int:id>`.

graphify --update drops edges belonging to re-extracted files, so run this
after every graphify update. It is idempotent: it removes everything it
added on the previous run before regenerating.

Usage (from the repo root):  python3 scripts/link_api_endpoints.py
"""

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GRAPH_PATH = ROOT / "graphify-out" / "graph.json"
FRONTEND_SRC = ROOT / "frontend" / "src"
FLASK_APP = ROOT / "app" / "app.py"
FLASK_API = ROOT / "app" / "api"
FLASK_SOCKET = ROOT / "app" / "socket"

ORIGIN = "api_link"  # marks every node/edge this script owns

FETCH_RE = re.compile(r"\bfetch\(\s*([`\"'])(.*?)\1", re.S)
METHOD_RE = re.compile(r"method:\s*[\"'](\w+)[\"']")
SOCKET_FE_RE = re.compile(r"\bsocket\.(emit|on)\(\s*[\"']([\w:-]+)[\"']")
BLUEPRINT_RE = re.compile(r"register_blueprint\(\s*(\w+)\s*,\s*url_prefix=[\"']([^\"']+)[\"']")
ROUTE_RE = re.compile(r"@(\w+)\.route\(\s*[\"']([^\"']*)[\"'](?:\s*,\s*methods=\[([^\]]*)\])?")
SOCKET_BE_RE = re.compile(r"@sio\.on\(\s*[\"']([\w:-]+)[\"']")
DEF_RE = re.compile(r"^\s*def\s+(\w+)\s*\(")


def rel(path):
    return path.relative_to(ROOT).as_posix()


def line_of(text, offset):
    return text.count("\n", 0, offset) + 1


def normalize(path):
    """Path pattern used for matching: any path parameter becomes {}."""
    path = re.sub(r"\$\{[^}]*\}", "{}", path)  # JS template literal
    return re.sub(r"<[^>]*>", "{}", path)  # Flask converter


def display(path):
    """Readable path: <int:id> and ${payload.id} both render as {id}."""
    path = re.sub(r"\$\{(?:[\w.]*\.)?(\w+)\}", r"{\1}", path)
    return re.sub(r"<(?:\w+:)?(\w+)>", r"{\1}", path)


def fetch_span(text, start):
    """Text of the fetch( ... ) call starting at `start`, matching parens."""
    depth, i, quote = 0, start, None
    while i < len(text):
        ch = text[i]
        if quote:
            if ch == "\\":
                i += 1
            elif ch == quote:
                quote = None
        elif ch in "\"'`":
            quote = ch
        elif ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
            if depth == 0:
                return text[start : i + 1]
        i += 1
    return text[start:]


def frontend_sites():
    """(kind, method_or_event, raw_path, file, line) for each fetch / socket call."""
    sites = []
    for f in sorted(FRONTEND_SRC.rglob("*.ts*")):
        text = f.read_text(encoding="utf-8")
        for m in FETCH_RE.finditer(text):
            method = METHOD_RE.search(fetch_span(text, m.start()))
            sites.append(("http", method.group(1).upper() if method else "GET", m.group(2), rel(f), line_of(text, m.start())))
        for m in SOCKET_FE_RE.finditer(text):
            sites.append(("socket", m.group(1), m.group(2), rel(f), line_of(text, m.start())))
    return sites


def backend_sites():
    """(kind, method_or_event, raw_path, file, decorator_line, handler_name)."""
    prefixes = dict(BLUEPRINT_RE.findall(FLASK_APP.read_text(encoding="utf-8")))
    sites = []
    for f in sorted(FLASK_API.glob("*.py")) + sorted(FLASK_SOCKET.glob("*.py")):
        lines = f.read_text(encoding="utf-8").splitlines()
        for i, text in enumerate(lines):
            route, event = ROUTE_RE.search(text), SOCKET_BE_RE.search(text)
            if not (route or event):
                continue
            handler = next((d.group(1) for d in map(DEF_RE.match, lines[i + 1 :]) if d), None)
            if event:
                sites.append(("socket", "on", event.group(1), rel(f), i + 1, handler))
                continue
            blueprint, path, methods = route.groups()
            if blueprint not in prefixes:
                print(f"warning: {rel(f)}:{i + 1} blueprint {blueprint!r} is not registered in app/app.py", file=sys.stderr)
                continue
            for method in re.findall(r"\w+", methods or "") or ["GET"]:
                sites.append(("http", method.upper(), prefixes[blueprint].rstrip("/") + path, rel(f), i + 1, handler))
    return sites


def main():
    graph = json.loads(GRAPH_PATH.read_text(encoding="utf-8"))
    nodes = [n for n in graph["nodes"] if n.get("_origin") != ORIGIN]
    links = [e for e in graph["links"] if e.get("_origin") != ORIGIN]
    removed = len(graph["nodes"]) - len(nodes), len(graph["links"]) - len(links)

    # Callable graph nodes per file, sorted by start line, to find the function
    # that encloses a call site; the file node is the fallback.
    by_id = {n["id"]: n for n in nodes}
    callables, file_nodes = defaultdict(list), {}
    for n in nodes:
        loc = re.fullmatch(r"L(\d+)", str(n.get("source_location") or ""))
        if n.get("_callable") and loc:
            callables[n.get("source_file")].append((int(loc.group(1)), n["id"]))
        elif n.get("label") == Path(str(n.get("source_file") or "")).name:
            file_nodes[n["source_file"]] = n["id"]
    for entries in callables.values():
        entries.sort()

    def enclosing(file, line):
        inside = [nid for start, nid in callables.get(file, []) if start <= line]
        return inside[-1] if inside else file_nodes.get(file)

    def handler_node(file, name):
        return next((nid for _, nid in callables.get(file, []) if by_id[nid]["label"] == f"{name}()"), file_nodes.get(file))

    # Group call sites and handlers by endpoint key.
    endpoints = defaultdict(lambda: {"callers": [], "handlers": [], "fe_paths": [], "be_paths": []})
    for kind, verb, path, file, line in frontend_sites():
        key = ("SOCKET", path) if kind == "socket" else (verb, normalize(path))
        endpoints[key]["callers"].append((enclosing(file, line), file, line, verb if kind == "socket" else "http"))
        endpoints[key]["fe_paths"].append(path)
    for kind, verb, path, file, line, handler in backend_sites():
        key = ("SOCKET", path) if kind == "socket" else (verb, normalize(path))
        endpoints[key]["handlers"].append((handler_node(file, handler), file, line, handler))
        endpoints[key]["be_paths"].append(path)

    new_nodes, new_links, rows, seen_ids, seen_links = [], [], [], set(), set()

    def add_link(link):
        # One edge per (source, target, relation), e.g. Chat() both emits and listens
        key = (link["source"], link["target"], link["relation"])
        if key not in seen_links:
            seen_links.add(key)
            new_links.append(link)

    for (verb, pattern), ep in sorted(endpoints.items()):
        # Flask's parameter names win; with duplicate rules, the first one is the one Flask dispatches to
        path = (ep["be_paths"] or ep["fe_paths"])[0]
        label = f"SOCKET {pattern}" if verb == "SOCKET" else f"{verb} {display(path)}"
        node_id = "api_endpoint_" + re.sub(r"[^a-z0-9]+", "_", label.lower()).strip("_")
        if node_id in seen_ids:
            sys.exit(f"error: endpoint id collision for {label!r}")
        seen_ids.add(node_id)
        handlers = [h for h in ep["handlers"] if h[0]]
        status = "matched" if ep["callers"] and handlers else "no_route" if ep["callers"] else "unused_route"
        if len(handlers) > 1 and verb != "SOCKET":
            status = "conflict"  # Flask only dispatches to the first matching rule
        home = handlers[0] if handlers else ep["callers"][0]
        community = by_id.get(home[0], {})
        new_nodes.append({
            "id": node_id, "label": label, "norm_label": label.lower(),
            "file_type": "concept", "source_file": home[1], "source_location": f"L{home[2]}",
            "community": community.get("community"), "community_name": community.get("community_name"),
            "api_status": status, "_origin": ORIGIN,
        })
        for caller, file, line, how in ep["callers"]:
            if caller:
                add_link({
                    "source": caller, "target": node_id, "relation": "references",
                    "confidence": "EXTRACTED", "confidence_score": 1.0, "context": how,
                    "source_file": file, "source_location": f"L{line}", "weight": 1.0, "_origin": ORIGIN,
                })
        for handler, file, line, _ in handlers:
            add_link({
                "source": handler, "target": node_id, "relation": "implements",
                "confidence": "EXTRACTED", "confidence_score": 1.0, "context": "socket" if verb == "SOCKET" else "http",
                "source_file": file, "source_location": f"L{line}", "weight": 1.0, "_origin": ORIGIN,
            })
        rows.append((status, label, sorted({by_id[c[0]]["label"] for c in ep["callers"] if c[0]}), [h[3] for h in handlers]))

    graph["nodes"], graph["links"] = nodes + new_nodes, links + new_links
    GRAPH_PATH.write_text(json.dumps(graph, indent=2), encoding="utf-8")

    print(f"Removed {removed[0]} nodes / {removed[1]} edges from the previous run.")
    print(f"Added {len(new_nodes)} endpoint nodes and {len(new_links)} edges to {rel(GRAPH_PATH)}.")
    for status in ("matched", "conflict", "no_route", "unused_route"):
        group = [r for r in rows if r[0] == status]
        if group:
            print(f"\n{status} ({len(group)}):")
            for _, label, callers, handlers in group:
                print(f"  {label:<48} {', '.join(callers) or '-'}  ->  {', '.join(handlers) or '-'}")


if __name__ == "__main__":
    main()
