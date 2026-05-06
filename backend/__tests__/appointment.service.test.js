import { jest, describe, beforeEach, test, expect } from '@jest/globals';

const appointmentState = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
};

const doctorState = {
    findById: jest.fn(),
    findOne: jest.fn(),
};

jest.unstable_mockModule('../src/models/Appointment.js', () => ({
    Appointment: appointmentState,
}));

jest.unstable_mockModule('../src/models/Doctor.js', () => ({
    Doctor: doctorState,
}));

const { ApiError } = await import('../src/utils/ApiError.js');
const {
    bookAppointment,
    cancelAppointment,
    getAppointmentById,
} = await import('../src/services/appointment.service.js');

describe('appointment.service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('books an appointment when slot is available', async () => {
        doctorState.findById.mockResolvedValue({
            _id: 'doctor-1',
            isActive: true,
            availability: [
                {
                    dayOfWeek: 1,
                    startTime: '09:00',
                    endTime: '10:00',
                    durationMinutes: 30,
                },
            ],
        });
        appointmentState.findOne.mockResolvedValue(null);
        appointmentState.create.mockResolvedValue({
            _id: 'appointment-1',
            slotStart: '09:00',
            slotEnd: '09:30',
        });

        const appointment = await bookAppointment('patient-1', {
            doctorId: 'doctor-1',
            date: '2026-05-04',
            slotStart: '09:00',
            reason: 'Checkup',
        });

        expect(doctorState.findById).toHaveBeenCalledWith('doctor-1');
        expect(appointmentState.findOne).toHaveBeenCalled();
        expect(appointmentState.create).toHaveBeenCalledWith({
            patient: 'patient-1',
            doctor: 'doctor-1',
            date: new Date('2026-05-04'),
            slotStart: '09:00',
            slotEnd: '09:30',
            reason: 'Checkup',
        });
        expect(appointment).toEqual({
            _id: 'appointment-1',
            slotStart: '09:00',
            slotEnd: '09:30',
        });
    });

    test('rejects a double-booked slot', async () => {
        doctorState.findById.mockResolvedValue({
            _id: 'doctor-1',
            isActive: true,
            availability: [
                {
                    dayOfWeek: 1,
                    startTime: '09:00',
                    endTime: '10:00',
                    durationMinutes: 30,
                },
            ],
        });
        appointmentState.findOne.mockResolvedValue({ _id: 'existing' });

        await expect(
            bookAppointment('patient-1', {
                doctorId: 'doctor-1',
                date: '2026-05-04',
                slotStart: '09:00',
            })
        ).rejects.toBeInstanceOf(ApiError);

        await expect(
            bookAppointment('patient-1', {
                doctorId: 'doctor-1',
                date: '2026-05-04',
                slotStart: '09:00',
            })
        ).rejects.toMatchObject({ statusCode: 409, message: 'Slot already booked' });
    });

    test('cancels an appointment outside the cutoff window', async () => {
        const save = jest.fn().mockResolvedValue(undefined);
        appointmentState.findById.mockResolvedValue({
            patient: 'patient-1',
            doctor: 'doctor-1',
            date: new Date(Date.now() + 48 * 60 * 60 * 1000),
            slotStart: '10:00',
            status: 'scheduled',
            notes: '',
            cancelledAt: null,
            save,
        });

        const appointment = await cancelAppointment('patient-1', 'appointment-1', {
            reason: 'No longer needed',
        });

        expect(save).toHaveBeenCalled();
        expect(appointment.status).toBe('cancelled');
        expect(appointment.cancelledAt).toBeInstanceOf(Date);
    });

    test('blocks appointment access for another patient', async () => {
        const mockAppt = {
            patient: { _id: 'patient-1' },
            doctor: { user: { _id: 'doctor-user-1' } },
        };
        appointmentState.findById.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockAppt),
        });

        await expect(
            getAppointmentById('appointment-1', { id: 'patient-2', role: 'patient' })
        ).rejects.toMatchObject({ statusCode: 403, message: 'Not your appointment' });
    });
});
