# LMS Backend API

A RESTful backend for a Learning Management System (LMS), built with Node.js, Express 5, and MongoDB. It provides authentication, role-based access control, and API documentation through Swagger.

## Requirements

- Node.js and npm
- MongoDB 7+ (for local development), or Docker with Docker Compose
- Git

## 1. Clone the Repository

```bash
git clone https://github.com/mohamed-bouth/Learning-Management-System.git
cd Learning-Management-System
npm install
```

## 2. Configure Environment Variables

Create a local environment file:

```bash
cp .env.example .env
```

Set the values for your local setup:

```env
MONGO_URI=mongodb://127.0.0.1:27017/lms
BACK_END_PORT=3000
BACK_END_HOST=0.0.0.0
JWT_SECRET=replace_with_a_strong_random_secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=15d
```

**Important:** Use a strong, private `JWT_SECRET`. Never commit `.env` or real secrets to Git.

## 3. Run Locally

1. Make sure MongoDB is running and accessible at `127.0.0.1:27017`.
2. Install dependencies with `npm install`.
3. Configure `.env` as described above.
4. Start the API:

   ```bash
   npm run dev
   ```

5. Open the Swagger UI at:

   ```text
   http://localhost:3000/api-docs
   ```

The API port and Swagger path above assume the app uses port `3000` and mounts Swagger at `/api-docs`.

### Database Commands

Seed the database with the project's sample data:

```bash
npm run db:seed
```

Drop the database data using the project's drop script:

```bash
npm run db:drop
```

**Warning:** `db:drop` is destructive. Check `src/database/drop.js` before running it.

## 4. Run with Docker Compose

Docker Compose uses a separate environment file because MongoDB is reached by the service name `mongodb` from inside the Docker network.

1. Create `.env` for Docker Compose's port-variable interpolation, and `.docker.env` for the API container:

   ```bash
   cp .env.example .env
   cp .docker.env.example .docker.env
   ```

   Compose reads `${BACK_END_HOST}` and `${BACK_END_PORT}` in `ports` from the shell or the root `.env` file. The `env_file: .docker.env` setting passes variables to the container; it does not provide values for Compose-file interpolation.

2. Make sure `.docker.env` contains:

   ```env
   MONGO_URI=mongodb://mongodb:27017/lms
   BACK_END_PORT=3000
   BACK_END_HOST=0.0.0.0
   JWT_SECRET=replace_with_a_strong_random_secret
   JWT_EXPIRES_IN=15m
   REFRESH_TOKEN_EXPIRES_IN=15d
   ```

3. Build and start the services:

   ```bash
   docker compose up --build -d
   ```

4. Check the running containers and API logs:

   ```bash
   docker compose ps
   docker compose logs -f api
   ```

5. Open Swagger UI:

   ```text
   http://localhost:3000/api-docs
   ```

Stop the services:

```bash
docker compose down
```

The MongoDB data is stored in the named Docker volume `mongodb_data`, so it remains after `docker compose down`. To remove the volume and its data too, run:

```bash
docker compose down -v
```

**Warning:** `docker compose down -v` permanently deletes the MongoDB data stored in that volume.

### Running Database Scripts in Docker

Run the seed script inside the API container:

```bash
docker compose exec api npm run db:seed
```

Run the database drop script only when you intentionally want to remove data:

```bash
docker compose exec api npm run db:drop
```

## Environment Variables

| Variable | Purpose | Example |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/lms` locally; `mongodb://mongodb:27017/lms` in Docker |
| `BACK_END_HOST` | Host/interface the API binds to | `0.0.0.0` |
| `BACK_END_PORT` | API port | `3000` |
| `JWT_SECRET` | Secret used to sign JWTs | Use a strong random secret |
| `JWT_EXPIRES_IN` | Access-token lifetime | `15m` |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh-token lifetime | `15d` |

## Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the API in development mode |
| `npm run db:seed` | Seed the database |
| `npm run db:drop` | Run the database drop script |
| `docker compose up --build -d` | Build and start Docker services |
| `docker compose logs -f api` | Follow API logs |
| `docker compose down` | Stop and remove containers |

## API Documentation

Swagger UI: `http://localhost:3000/api-docs`

## Notes

- Keep `.env` and `.docker.env` private; do not commit secrets.
- In Docker, use `mongodb` as the MongoDB hostname from the API container, not `127.0.0.1`.
- Docker Compose reads port-mapping variables from the shell or the root `.env`; `.docker.env` supplies environment variables to the API container only.