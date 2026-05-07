#  BookMyDoctor – Patient Frontend

A modern, responsive React application that allows patients to discover trusted doctors, book appointments, and manage their healthcare journey.

![Patient Interface](../assets/screenshots/patient_home.png)
![Patient Home Page](assets/screenshots/dashboard_2.png)

##  Core Features

-  **Multilingual Support**: Use the app in English or Amharic (`i18next`).
-  **Specialist Discovery**: Browse and filter doctors by categories like General Physician, Dermatologist, etc.
-  ** Real-time Booking**: Check doctor availability and book time slots instantly.
-  **Integrated Payments**: Secure payment processing via PayHere.
-  **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.
-  **Secure Profile**: Personalize your profile and manage upcoming appointments.

##  Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API + TanStack Query
- **Internationalization:** i18next
- **Forms & Validation:** Axios + React Toastify

## Development Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```

3. **Start Dev Server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:5173](http://localhost:5173)

## Architecture Overview

- `src/context/AppContext.jsx`: Central hub for global state (auth, doctors list, user profile).
- `src/pages/`: Modular page components (Home, Doctors, Appointment, etc.).
- `src/components/`: Reusable UI components (Navbar, Header, RelatedDoctors).
