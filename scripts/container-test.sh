#!/usr/bin/env bash
# Build the DepthChart images and test them in containers.
#
#   scripts/container-test.sh              # uses podman if installed, else docker
#   CONTAINER_ENGINE=docker scripts/container-test.sh
#
# 1. Builds the production image (depthchart:latest) and the test image
#    (depthchart:test, the `test` Dockerfile target).
# 2. Starts a throwaway Postgres container on a private network.
# 3. Runs the pytest suite inside the test image against that database.
# 4. Migrates the database, boots the production image and checks that it
#    serves the API, the React app and the socket.io handshake.
set -euo pipefail

ENGINE="${CONTAINER_ENGINE:-$(command -v podman >/dev/null && echo podman || echo docker)}"
IMAGE="${IMAGE:-depthchart}"
HOST_PORT="${HOST_PORT:-58080}"
NAME="depthchart-test-$$"
NET="$NAME-net"
DB_URL="postgresql://postgres@$NAME-db:5432/depthchart_test"

cd "$(dirname "$0")/.."

cleanup() {
    "$ENGINE" rm -f "$NAME-app" "$NAME-db" >/dev/null 2>&1 || true
    "$ENGINE" network rm "$NET" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "==> Building images with $ENGINE"
"$ENGINE" build -t "$IMAGE:latest" .
"$ENGINE" build --target test -t "$IMAGE:test" .

echo "==> Starting Postgres"
"$ENGINE" network create "$NET" >/dev/null
"$ENGINE" run -d --name "$NAME-db" --network "$NET" \
    -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=depthchart_test \
    docker.io/library/postgres:18-alpine >/dev/null
for _ in $(seq 60); do
    # Wait for the server started after initdb, not the temporary init one
    "$ENGINE" exec "$NAME-db" pg_isready -h 127.0.0.1 -U postgres -q && break
    sleep 1
done

echo "==> Running pytest in $IMAGE:test"
"$ENGINE" run --rm --network "$NET" -e TEST_DATABASE_URL="$DB_URL" "$IMAGE:test" pytest -q

echo "==> Smoke testing $IMAGE:latest"
APP_ENV=(-e DATABASE_URL="$DB_URL" -e SECRET_KEY=container-test)
"$ENGINE" run --rm --network "$NET" "${APP_ENV[@]}" "$IMAGE:latest" flask db upgrade
"$ENGINE" run -d --name "$NAME-app" --network "$NET" -p "127.0.0.1:$HOST_PORT:8000" \
    "${APP_ENV[@]}" "$IMAGE:latest" >/dev/null

check() {
    local desc="$1" path="$2" expect="$3" body
    for _ in $(seq 30); do
        body="$(curl -fsS "http://127.0.0.1:$HOST_PORT$path" 2>/dev/null)" && break
        sleep 1
    done
    if [[ "$body" != *"$expect"* ]]; then
        echo "FAIL: $desc ($path) did not contain: $expect" >&2
        "$ENGINE" logs "$NAME-app" 2>&1 | tail -20 >&2
        exit 1
    fi
    echo "ok: $desc"
}
check "API responds" /api/auth/ '"errors":["Unauthorized"]'
check "React app is served" /servers/1 '<div id="root">'
check "socket.io handshake" "/socket.io/?EIO=4&transport=polling" '"sid"'

echo "==> All container tests passed ($ENGINE)"
