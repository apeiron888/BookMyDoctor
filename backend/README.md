# Backend — Hospital Appointment Management System (HAMS)

Express.js REST API with JWT auth, MongoDB/Mongoose, Redis, and role-based access control (patient, doctor, admin).

## Quick Start

### 1. Install dependencies
```bash
npm ci
```

### 2. Create `.env`
```bash
cp .env.example .env
# Edit .env with real values:
#   MONGO_URI=mongodb://mongo:27017
#   REDIS_URL=redis://redis:6379
#   ACCESS_TOKEN_SECRET=your-secret
#   REFRESH_TOKEN_SECRET=your-refresh-secret
```

### 3. Run migrations / seed data
```bash
MONGO_URI="mongodb://localhost:27017" \
REDIS_URL="redis://localhost:6379" \
ACCESS_TOKEN_SECRET="dev-secret" \
REFRESH_TOKEN_SECRET="dev-refresh-secret" \
node seed.js
```

### 4. Start the server
```bash
npm run dev       # watch mode
npm start         # production
```

Server listens on port 5000.

## API Endpoints

### Auth (`/api/auth`)
- `POST /register` — Register patient
- `POST /login` — Login, get tokens
- `POST /refresh` — Rotate tokens
- `POST /logout` — Logout

### Doctors (`/api/doctors`)
- `GET /` — List doctors (filter by specialization, name)
- `GET /:id` — Get doctor profile
- `GET /:id/slots?date=YYYY-MM-DD` — Get available slots

### Appointments (`/api/appointments`)
- `POST /` — Book appointment (patients only)
- `GET /my` — List my appointments (patients only)
- `GET /doctor` — List doctor's appointments (doctors only)
- `GET /:id` — Get single appointment
- `PATCH /:id/cancel` — Cancel appointment (patients, 24 hrs before)
- `PATCH /:id/complete` — Mark completed (doctors)

### Admin (`/api/admin`)
- `GET /users` — List users (filter: role, search)
- `GET /appointments` — List appointments (filter: status, doctor, date)
- `POST /doctors` — Create doctor profile
- `PATCH /doctors/:id` — Update doctor
- `DELETE /doctors/:id` — Soft-delete doctor
- `PATCH /appointments/:id/cancel` — Force-cancel appointment

## Testing

```bash
npm test
```

Runs Jest tests with mocks. See `__tests__/` for examples.

## Project Structure

```
src/
├── app.js              # Express app
├── server.js           # Entry point
├── config/             # DB/Redis/Env
├── middleware/         # Auth, validation, error handling
├── models/             # Mongoose schemas
├── services/           # Business logic
├── controllers/        # Route handlers
├── routes/             # Route definitions
├── validators/         # Zod schemas
└── utils/              # Helpers
```

## Notes

- Access tokens expire in 15 minutes; refresh tokens in 7 days.
- Refresh tokens stored in Redis (revoked on logout).
- Slot conflict detection via unique compound index on Appointment.
- Rate limiting: 20 requests/minute on auth routes (Redis-backed).
