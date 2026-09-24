# DepthChart

## *By Robert Kauth - Visit [DepthChart](https://depthchart.herokuapp.com/)*

![DepthChart logo](https://fantasydepthchart.s3.us-west-1.amazonaws.com/discord_footballgithub.png)

---

## Depthchart Overview

Depthchart is a web application designed with fantasy football leagues in mind. Personally I have found it difficult to keep track of things when four or more apps are being using by our comissioner to desemminate important information. Depthchart aims to solve this problem by getting everything under one roof.

Users at Depthchart can each create their own custom server that can be home to as many custom channels as they like, and all of this can be shared with other members in their league if they decide.

---

## Application Technology

### Backend

    1. Python
    2. Flask
    3. Postgresql
    4. SQLAlchemy
SQLAlchemy acts as the python SQL interface and is used as the Object Relational Mapper (ORM). This allows the management of the PostgreSQL database tables and the seeding of data. Below is some code that shows how the user table is created and relationships to other tables are created:
![User table](https://fantasydepthchart.s3.us-west-1.amazonaws.com/Code/User_model.png)

---

### FrontEnd

    1. HTML
    2. Vanilla CSS
    3. TypeScript
    4. React
    5. Redux
    6. Vite
React-Redux is a Javascript libray that is used to build the responsive UI. The combination of a virtual DOM via React and state management via Redux allows the user to create/edit servers and channels and render them immediately on the page without the need to refresh the page. The following code snippets show how react and redux combine to render the users servers and dynamically render server tiles in the UI:
![Servers](https://fantasydepthchart.s3.us-west-1.amazonaws.com/Code/servers.png)

---

## Development

The backend is a [uv](https://docs.astral.sh/uv/) project on Python 3.14 and the frontend uses pnpm.

```bash
cp .env.example .env              # then point DATABASE_URL at your Postgres database
uv sync                           # install Python and backend dependencies into .venv
uv run flask db upgrade && uv run flask seed all
uv run flask run                  # API + socket.io on http://localhost:5000

cd frontend && pnpm install && pnpm dev   # Vite dev server, proxies /api and /socket.io to Flask
```

Run the backend tests against a disposable Postgres database (every test drops and recreates the tables):

```bash
TEST_DATABASE_URL=postgresql://postgres@localhost:5432/depthchart_test uv run pytest
```

### Containers

The `Dockerfile` builds with either Podman or Docker (swap `podman` for `docker` below):

```bash
podman build -t depthchart .                            # production image (default target)
podman run -p 8000:8000 -e DATABASE_URL=... -e SECRET_KEY=... depthchart
```

`scripts/container-test.sh` builds the production image and a `test` image (`--target test`), runs the
pytest suite inside the test image against a throwaway Postgres container, then boots the production
image and smoke tests it. It uses Podman when installed and Docker otherwise; set
`CONTAINER_ENGINE=docker` to choose explicitly.

```bash
scripts/container-test.sh
```

---

## Future Developments

* Instant Chat and Messaging between multiple users
* Searching other users
* Integration with fantasy football news sources
