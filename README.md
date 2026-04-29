# Event Registration System

This repository contains a summer practice assignment solution: a full-stack event registration system with a Spring Boot backend, React frontend, PostgreSQL database, Liquibase migrations, and Docker Compose setup.

## Overview

The application supports two user flows:

- public users can view events and register for them,
- an admin can log in and create new events.

Public registration does not require an account. A participant registers with first name, last name, and Estonian personal code. The same participant cannot register for the same event twice, but can register for different events.

## Tech Stack

### Backend

- **Java 26**
- **Spring Boot 4.0.6**
- **Spring Data JPA**
- **Spring Security + JWT**
- **PostgreSQL**
- **Liquibase**
- **Lombok**
- **JUnit 5**

### Frontend

- **React 19 + TypeScript**
- **Vite**
- **Material UI**
- **TanStack Query**
- **React Hook Form**
- **Zod**
- **Axios**
- **React Toastify**

### Infrastructure

- **Docker Compose**
- **Nginx** for serving the production frontend build

## Repository Structure

```text
.
├── backend/             # Spring Boot backend
├── frontend/            # React frontend
├── docker-compose.yml   # PostgreSQL + backend + frontend
└── README.md
```

## How to Run

Make sure Docker Desktop is running.

### Full Stack With Docker

Build and start all services:

```sh
docker compose up -d --build
```

Open the application:

```text
http://localhost:3000
```

Backend API:

```text
http://localhost:8080/api
```

Stop containers:

```sh
docker compose down
```

To also remove the PostgreSQL volume:

```sh
docker compose down -v
```

### Admin Login

Default admin credentials for local review:

```text
Email: admin@example.com
Password: DevAdmin!2026LocalOnly
```

These values can be changed in `docker-compose.yml` or through environment variables.

## Local Development

### Start Database

```sh
docker compose up -d postgres
```

### Run Backend

From the `backend` directory:

```sh
./gradlew bootRun
```

Backend runs on:

```text
http://localhost:8080
```

### Run Frontend

From the `frontend` directory:

```sh
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## API Endpoints

Public endpoints:

- `GET /api/events`
- `POST /api/events/{eventId}/registrations`

Admin endpoints:

- `POST /api/auth/login`
- `POST /api/events`

Example admin login:

```sh
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"DevAdmin!2026LocalOnly"}'
```

Example event creation:

```sh
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Summer School","eventTime":"2026-07-10T18:00:00","maxParticipants":20}'
```

Example registration:

```sh
curl -X POST http://localhost:8080/api/events/1/registrations \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Mari","lastName":"Tamm","personalCode":"49002029999"}'
```

## Configuration

Main backend configuration:

```text
backend/src/main/resources/application.yml
```

Important environment variables:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION_MINUTES`

## Validation and Error Handling

The backend validates request data and returns structured API errors for invalid input or business rule conflicts.

Important rules:

- event title is required,
- event time must be in the future,
- max participants must be positive,
- participant first name, last name, and personal code are required,
- registration is blocked when an event is full,
- duplicate registration for the same event and personal code is blocked.

## Verification

Useful checks:

```sh
cd backend
./gradlew test
```

Backend unit tests cover event creation, event registration business rules, and admin login logic.

```sh
cd frontend
npm run build
```

Docker build was verified with:

```sh
docker compose up -d --build
```
