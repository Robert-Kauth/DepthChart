# Builds with Docker or Podman. Base images are fully qualified so Podman
# does not depend on unqualified-search registries being configured.
FROM docker.io/library/node:26 AS build-stage

WORKDIR /frontend

# Install dependencies from the lockfile first so they cache between builds
RUN npm install -g pnpm@12.6.0
COPY frontend/package.json frontend/pnpm-lock.yaml frontend/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Build our Vite app
COPY frontend/. .
RUN pnpm run build

FROM docker.io/library/python:3.14.7-slim AS app
COPY --from=ghcr.io/astral-sh/uv:0.12.18 /uv /uvx /bin/

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

# Setup uv: install into /var/www/.venv from the lockfile, without dev tools
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV UV_NO_DEV=1
ENV PATH="/var/www/.venv/bin:$PATH"

EXPOSE 8000

WORKDIR /var/www

# Install Python Dependencies first so they cache between builds
COPY pyproject.toml uv.lock .python-version ./
RUN uv sync --locked

COPY . .
COPY --from=build-stage /frontend/dist/ app/static/

# Run flask environment. Flask-SocketIO runs in threading mode and serves
# WebSockets through simple-websocket, so use a single threaded worker.
# Heroku provides $PORT; elsewhere listen on 8000 on all interfaces. exec
# makes gunicorn PID 1 so it receives SIGTERM and shuts down gracefully.
CMD exec gunicorn -w 1 --threads 100 -b 0.0.0.0:${PORT:-8000} app:app

# Test image: the app image plus pytest. Build with `--target test`;
# scripts/container-test.sh runs it against a Postgres container.
FROM app AS test
RUN uv sync --locked --dev
CMD ["pytest"]

# Default target: the production image
FROM app
