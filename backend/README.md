# BookMyDoctor – Backend API (Express)

Express/Mongoose API that powers BookMyDoctor. Provides user, doctor, and admin endpoints with JWT authentication, file uploads to Cloudinary, MongoDB persistence, and PayHere payments (LKR).

## 🛠️ Tech Stack

-  **Node.js** with **Express 5**
-  **MongoDB** via **Mongoose 8**
-  **JWT Authentication** (jsonwebtoken)
-  **Multer** for multipart uploads
-  **Cloudinary SDK v2** for media storage
-  **CORS** enabled
-  **Validator** for data validation
-  **Bcrypt** for password hashing
-  **Crypto** for secure operations

##  Getting Started

```bash
npm install

#  Development with auto-reload
npm run server

#  Production
npm start
```

Default port is `4000` unless `PORT` is set.

##  Environment Variables (`backend/.env`)

```env
#  Server Configuration
PORT=4000

#  Database
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster...
# Note: The code connects to `${MONGODB_URI}/prsecripto`

#  Security
JWT_SECRET=<strong-secret>

#  Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_SECRET_KEY=...

#  Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=supersecret

#  URLs
FRONTEND_URL=https://bookmydoctor.vercel.app
BACKEND_URL=https://bookmydoctor-backend.vercel.app

#  PayHere Payment Gateway
PAYHERE_MERCHANT_ID=...
PAYHERE_MERCHANT_SECRET=...
```

##  API Routes

-  `GET /` → Health check: "api working..."
-  `/api/admin` → Admin operations router
-  `/api/doctor` → Doctor operations router
-  `/api/user` → User/Patient operations router

##  Authentication Headers

- **Users/Patients**: `token: <jwt>` (payload `{ id }`)
- **Doctors**: `dtoken: <jwt>` (payload `{ id }`)
- **Admins**: `atoken: <jwt>` (token is `jwt.sign(email + password, JWT_SECRET)`)

**Common Response Shape:** `{ success: boolean, ... }`  
**Error Response:** `{ success: false, message: "..." }`

##  File Uploads

-  Multer disk storage (filename preserved)
-  Field name: `image`
-  On user and admin doctor creation, files are uploaded to Cloudinary
-  Secure URL is stored in the database


##  Important Notes

-  CORS is enabled with defaults; adjust for production as needed
-  MongoDB connection logs "MongoDB connected" on success
-  Appointment slot locking is based on the `slots_booked` map in doctor documents
-  Amounts are treated as LKR decimals with two decimal places when hashing for PayHere

##  Troubleshooting

-  **401 Unauthorized**: Missing/invalid token header or mismatched `JWT_SECRET`
-  **MongoDB errors**: Ensure `MONGODB_URI` is valid and properly formatted
-  **Cloudinary failure**: Verify cloud credentials and that `image` field is sent in multipart form
-  **PayHere signature mismatch**: Confirm `PAYHERE_MERCHANT_SECRET`, `FRONTEND_URL`, `BACKEND_URL`, and that amount is formatted to 2 decimals
