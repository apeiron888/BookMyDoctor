# HAMS — Quick Reference & Deployment Guide

## 🎬 Get Started in 5 Minutes

### Option 1: Local Development

**Terminal 1 — Backend:**
```bash
cd backend
npm ci
npm run dev   # Starts on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm ci
npm run dev   # Starts on http://localhost:3000
```

**Terminal 3 — Seed data (optional):**
```bash
cd backend
node seed.js   # Creates test users: admin@hams.com, john@hams.com, jane@hams.com
```

**Test Credentials:**
```
Admin:   admin@hams.com / Admin@123456
Doctor:  john@hams.com / Doctor@123456
Patient: jane@hams.com / Patient@123456
```

### Option 2: Docker (Production-ready)

```bash
# 1. Prepare environment
cp .env.example .env
# Edit .env if needed (change secrets for production)

# 2. Build & run everything
docker compose up --build

# 3. Seed test data (in new terminal)
docker compose exec backend node seed.js

# 4. Access at http://localhost
```

---

## 📚 API Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@hams.com","password":"Patient@123456"}'
```
Returns: `{ accessToken, user: { id, name, email, role } }`

### List Doctors
```bash
curl -X GET 'http://localhost:5000/api/doctors?specialization=Cardiology' \
  -H "Authorization: Bearer <accessToken>"
```

### Get Available Slots
```bash
curl -X GET 'http://localhost:5000/api/doctors/doctor-id/slots?date=2026-05-15' \
  -H "Authorization: Bearer <accessToken>"
```

### Book Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "doctorId": "doctor-id",
    "date": "2026-05-15",
    "slotStart": "10:00",
    "reason": "Checkup"
  }'
```

---

## 🧪 Running Tests

```bash
cd backend
npm test   # 4 jest tests passing
```

---

## 📦 Build for Production

### Backend
```bash
cd backend
npm ci --omit=dev
npm start   # or use docker build
```

### Frontend
```bash
cd frontend
npm ci
npm run build   # Generates dist/ for production
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot find module 'express'` | Run `npm ci` in backend/ |
| Port 5000 already in use | `lsof -i :5000` and kill process or use different port |
| MongoDB connection refused | Ensure `MONGO_URI` is correct; try local `mongodb://localhost:27017` |
| Login fails with 401 | Verify credentials in seed data or check `.env` secrets |
| Frontend blank/404 | Check Nginx proxy; ensure backend health check passes |

---

## 🔑 Key Files to Know

| File | Purpose |
|------|---------|
| `backend/src/server.js` | Backend entry point |
| `backend/seed.js` | Populate test data |
| `frontend/src/App.jsx` | Frontend router + QueryClient |
| `docker-compose.yml` | Full stack orchestration |
| `.env.example` | Required environment variables |
| `IMPLEMENTATION_COMPLETE.md` | Full system design & specs |

---

## 📋 Checklist: Pre-Production

- [ ] Change `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` to strong random values (32+ chars)
- [ ] Update `CLIENT_URL` to your domain
- [ ] Enable HTTPS (reverse proxy / load balancer)
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB authentication (in production)
- [ ] Configure Redis authentication (in production)
- [ ] Set up monitoring & logging (optional)
- [ ] Run full test suite: `npm test` (backend)
- [ ] Build frontend: `npm run build`
- [ ] Test Docker build: `docker compose up --build`

---

## 🎯 Feature Completeness

✅ User authentication (register, login, refresh, logout)
✅ Patient appointment booking
✅ Doctor appointment management
✅ Admin user & appointment oversight
✅ Slot conflict prevention (unique index)
✅ 24-hour cancellation cutoff
✅ Role-based access control
✅ Rate limiting on auth routes
✅ Input validation (Zod)
✅ Error handling & logging
✅ Docker containerization
✅ Nginx reverse proxy
✅ React frontend with routing
✅ TanStack Query for data fetching
✅ Tailwind CSS styling
✅ Jest unit tests

---

## 📞 Support

For issues or questions, refer to:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Full docs: `IMPLEMENTATION_COMPLETE.md`
- Implementation plan: `implementation_plan.md`
- Task checklist: `task.md`
