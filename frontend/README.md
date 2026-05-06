# Frontend — Hospital Appointment Management System (HAMS)

React + Vite + Tailwind CSS frontend for patient, doctor, and admin dashboards.

## Quick Start

### 1. Install dependencies
```bash
npm ci
```

### 2. Create `.env`
```bash
VITE_API_URL=/api
VITE_APP_NAME=HAMS
```

### 3. Run dev server
```bash
npm run dev
```

Frontend runs on `http://localhost:3000` with proxy to `/api`.

### 4. Build for production
```bash
npm run build
```

## Features

### Patient
- Browse doctors by specialization and name
- View doctor profiles and available appointment slots
- Book appointments with slot conflict prevention
- View, cancel (24 hrs before) own appointments
- Role-based dashboard

### Doctor
- View assigned appointments
- Mark appointments as completed
- Role-based dashboard

### Admin
- List all users (filter by role, search)
- List all appointments (filter by status, date, doctor)
- Manage doctor profiles (create, update, deactivate)
- Force-cancel appointments
- Dashboard overview

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # App router
├── index.css             # Tailwind + globals
├── context/              # AuthContext + provider
├── hooks/                # useAuth, useApi, etc.
├── services/             # api.js (Axios instance)
├── components/
│   ├── ui/               # Button, Input, Card, Modal, etc.
│   └── layout/           # Navbar, Sidebar, DashboardLayout
├── pages/
│   ├── auth/             # Login, Register
│   ├── patient/          # Dashboard, DoctorList, Booking, MyAppointments
│   ├── doctor/           # Dashboard, Appointments
│   └── admin/            # Dashboard, Users, Appointments
└── router/               # ProtectedRoute, RoleRoute
```

## Key Libraries

- **React Router v6** — Client-side routing
- **React Query (TanStack)** — Data fetching & caching
- **Axios** — HTTP client with interceptors
- **Tailwind CSS v3** — Styling

## API Integration

- Base URL: `/api` (proxied to backend in dev)
- Auth: JWT tokens stored in `sessionStorage`
- Interceptors handle token refresh on 401
- Auto-logout on refresh failure

## Development

```bash
npm run lint     # Lint code
npm run dev      # Start dev server
npm run build    # Build for prod
npm run preview  # Preview prod build
```
