import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Embedded subdocument: represents a recurring availability window for a doctor.
 * dayOfWeek: 0 = Sunday, 6 = Saturday
 * startTime / endTime: "HH:MM" 24-hour format
 * durationMinutes: slot length (used to compute slotEnd from slotStart)
 */
const availabilitySlotSchema = new Schema(
    {
        dayOfWeek: {
            type: Number,
            required: true,
            min: 0,
            max: 6,
        },
        startTime: {
            type: String,
            required: true,
            match: [/^\d{2}:\d{2}$/, 'startTime must be in HH:MM format'],
        },
        endTime: {
            type: String,
            required: true,
            match: [/^\d{2}:\d{2}$/, 'endTime must be in HH:MM format'],
        },
        durationMinutes: {
            type: Number,
            required: true,
            default: 30,
            enum: [15, 20, 30, 45, 60],
        },
    },
    { _id: false }
);

const doctorSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        specialization: {
            type: String,
            required: [true, 'Specialization is required'],
            trim: true,
        },
        qualification: {
            type: String,
            required: [true, 'Qualification is required'],
            trim: true,
        },
        experience: {
            type: Number,
            required: [true, 'Experience is required'],
            min: [0, 'Experience cannot be negative'],
        },
        fee: {
            type: Number,
            required: [true, 'Consultation fee is required'],
            min: [0, 'Fee cannot be negative'],
        },
        bio: {
            type: String,
            maxlength: [500, 'Bio must be 500 characters or fewer'],
            default: '',
        },
        availability: {
            type: [availabilitySlotSchema],
            default: [],
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Indexes
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ isActive: 1 });

export const Doctor = mongoose.model('Doctor', doctorSchema);
