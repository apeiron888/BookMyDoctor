#  BookMyDoctor – Backend API

The robust Express.js / MongoDB engine powering BookMyDoctor. Handles secure authentication, real-time booking logic, media processing, and payment integrations.

## Core Tech Stack

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose (Primary), Redis (Auth & Rate Limiting)
- **Media Storage:** Cloudinary
- **Auth:** JWT (JSON Web Tokens)
- **Validation:** Zod

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_SECRET_KEY=...
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=...
   ```

3. **Start the Server:**
   ```bash
   npm run server   # Development (Nodemon)
   npm start       # Production
   ```

## API Architecture

The API is organized into three main namespaces:

### User/Patient (`/api/user`)
- Registration & Login
- Profile management with image upload
- Appointment booking and cancellation
- Payment processing (PayHere)

### Doctor (`/api/doctor`)
- Specialized login for medical staff
- Appointment tracking and completion
- Real-time availability toggling

### Admin (`/api/admin`)
- Full control over the doctor directory
- Platform-wide appointment oversight
- System analytics and dashboard support

---