FROM node:22 AS build-stage

WORKDIR /frontend

# Install dependencies from the lockfile first so they cache between builds
RUN npm install -g pnpm@8.15.9
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build our Vite app
COPY frontend/. .
RUN pnpm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /frontend/dist/ app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn --worker-class eventlet -w 1 app:app
