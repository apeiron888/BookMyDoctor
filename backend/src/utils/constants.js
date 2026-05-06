/** @enum {string} User roles */
export const ROLES = {
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    ADMIN: 'admin',
};

/** @enum {string} Appointment status values */
export const APPOINTMENT_STATUS = {
    SCHEDULED: 'scheduled',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};

/** Minimum hours before a scheduled appointment that a patient can cancel */
export const CANCEL_CUTOFF_HOURS = 24;

/** Cookie name for the refresh token */
export const REFRESH_TOKEN_COOKIE = 'refreshToken';
