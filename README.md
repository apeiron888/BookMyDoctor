# Hospital Appointment Management System (HAMS)

A full-stack MERN monorepo for managing hospital appointments with patient, doctor, and admin roles. Built with Express.js, React, MongoDB, Redis, Docker, and Nginx.

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** — Get running in 5 minutes
- **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** — Full system design & features
- **[backend/README.md](backend/README.md)** — Backend API docs & setup
- **[frontend/README.md](frontend/README.md)** — Frontend features & setup

## 🚀 Quick Start

### Local Development
```bash
# Terminal 1: Backend
cd backend && npm ci && npm run dev

# Terminal 2: Frontend
cd frontend && npm ci && npm run dev

# Terminal 3: Seed test data (optional)
cd backend && npm run seed
```

Visit `http://localhost:3000` for local frontend development.

If you are running the Docker stack, add `127.0.0.1 mydoctor.com` to your hosts file and open `http://mydoctor.com`.

### Docker (Recommended)
```bash
docker compose up --build -d
```
Visit `http://localhost:5173` for the Patient Frontend and `http://localhost:5174` for the Admin Dashboard.

## 📋 Features

✅ **Authentication** — JWT + refresh tokens, Redis-backed revocation
✅ **Patient** — Browse doctors, book appointments, manage bookings
✅ **Doctor** — View assigned appointments, mark completed
✅ **Admin** — User management, appointment oversight, doctor CRUD
✅ **Validation** — Zod schemas for all requests
✅ **Rate Limiting** — Redis-backed (20 req/min on auth endpoints)
✅ **Conflict Prevention** — Unique compound index prevents double-booking
✅ **Role-Based Access** — Patient, doctor, admin roles
✅ **Frontend** — React + Vite, formal localized CSS layout, role-based dashboards
✅ **Localization** — Global English & Amharic translations via `react-i18next`
✅ **Docker** — Full containerization for frontend, backend, dashboard, redis, and mongodb components
✅ **Tests** — Jest + Supertest (4 tests passing)

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS v3, TanStack Query, Axios, React Router v6 |
| Backend | Node.js 20, Express, Mongoose, ioredis, JWT, Zod |
| Database | MongoDB 7, Redis 7 |
| DevOps | Docker, Docker Compose, Nginx |
| Testing | Jest, Supertest |

## 📁 Project Structure

```
BookMyDoctor/
├── backend/          # Express REST API + services + tests
├── frontend/         # React SPA (Vite)
├── nginx/            # Reverse proxy config
├── docker-compose.yml
├── QUICK_START.md    # 5-minute setup guide
└── IMPLEMENTATION_COMPLETE.md
```

## 🔐 Test Credentials

After seeding, use:
- **Admin:** `admin@hams.com` / `Admin@123456`
- **Doctor:** `john@hams.com` / `Doctor@123456`
- **Patient:** `jane@hams.com` / `Patient@123456`

## 📊 API Overview

| Endpoint | Method | Auth | Role | Purpose |
|----------|--------|------|------|---------|
| `/api/auth/register` | POST | ✗ | — | Register patient |
| `/api/auth/login` | POST | ✗ | — | Login → tokens |
| `/api/doctors` | GET | ✓ | any | List doctors |
| `/api/appointments` | POST | ✓ | patient | Book appointment |
| `/api/appointments/my` | GET | ✓ | patient | My appointments |
| `/api/appointments/doctor` | GET | ✓ | doctor | Doctor's appointments |
| `/api/admin/users` | GET | ✓ | admin | List users |
| `/api/admin/appointments` | GET | ✓ | admin | All appointments |

See [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md) for full API docs.

## 🚢 Deployment Checklist

- [ ] Update `.env` secrets (ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET)
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB & Redis credentials
- [ ] Enable HTTPS (Nginx / load balancer)
- [ ] Run backend tests: `npm test`
- [ ] Build frontend: `npm run build`
- [ ] Test Docker build: `docker compose up --build`
- [ ] Seed initial data
- [ ] Monitor logs & set up alerting

---

**Status:** ✅ Production-ready. All phases 1–5 complete.
