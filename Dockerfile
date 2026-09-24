FROM node:26 AS build-stage

WORKDIR /frontend

# Install dependencies from the lockfile first so they cache between builds
RUN npm install -g pnpm@12.6.0
COPY frontend/package.json frontend/pnpm-lock.yaml frontend/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Build our Vite app
COPY frontend/. .
RUN pnpm run build

FROM python:3.14.7-slim
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
CMD gunicorn -w 1 --threads 100 app:app
