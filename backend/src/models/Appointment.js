import mongoose from 'mongoose';
import { APPOINTMENT_STATUS } from '../utils/constants.js';

const { Schema } = mongoose;

const appointmentSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        doctor: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true,
        },
        date: {
            type: Date,
            required: [true, 'Appointment date is required'],
        },
        slotStart: {
            type: String,
            required: true,
            match: [/^\d{2}:\d{2}$/, 'slotStart must be in HH:MM format'],
        },
        slotEnd: {
            type: String,
            required: true,
            match: [/^\d{2}:\d{2}$/, 'slotEnd must be in HH:MM format'],
        },
        status: {
            type: String,
            enum: Object.values(APPOINTMENT_STATUS),
            default: APPOINTMENT_STATUS.SCHEDULED,
        },
        reason: {
            type: String,
            maxlength: [500, 'Reason must be 500 characters or fewer'],
            default: '',
        },
        notes: {
            type: String,
            maxlength: [1000, 'Notes must be 1000 characters or fewer'],
            default: '',
        },
        cancelledAt: { type: Date },
    },
    { timestamps: true }
);

// Query indexes
appointmentSchema.index({ patient: 1, date: -1 });
appointmentSchema.index({ doctor: 1, date: 1 });
appointmentSchema.index({ status: 1 });

/**
 * Compound partial unique index: prevents double-booking of the same slot.
 * Cancelled appointments are excluded via partialFilterExpression,
 * so the same slot can be rebooked after cancellation.
 */
appointmentSchema.index(
    { doctor: 1, date: 1, slotStart: 1 },
    {
        unique: true,
        partialFilterExpression: { status: { $ne: APPOINTMENT_STATUS.CANCELLED } },
    }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
