// Flask sets a csrf_token cookie on every response and CSRFProtect requires
// state-changing requests to echo it back in the X-CSRFToken header. Another
// site can make the browser send our cookies but cannot read them, so it
// cannot produce this header.
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function getCsrfToken(): string | undefined {
    const cookie = document.cookie
        .split("; ")
        .find((c) => c.startsWith("csrf_token="));
    return cookie && decodeURIComponent(cookie.slice("csrf_token=".length));
}

export default function csrfFetch(
    input: RequestInfo | URL,
    init: RequestInit = {}
): Promise<Response> {
    const method = (init.method ?? "GET").toUpperCase();
    const token = getCsrfToken();
    if (SAFE_METHODS.has(method) || !token) {
        return fetch(input, init);
    }
    const headers = new Headers(init.headers);
    headers.set("X-CSRFToken", token);
    return fetch(input, { ...init, headers });
}
