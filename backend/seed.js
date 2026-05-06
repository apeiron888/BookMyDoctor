import mongoose from 'mongoose';
import { User } from '../src/models/User.js';
import { Doctor } from '../src/models/Doctor.js';
import { Appointment } from '../src/models/Appointment.js';
import { env } from '../src/config/env.js';
import { ROLES, APPOINTMENT_STATUS } from '../src/utils/constants.js';

const seedDatabase = async () => {
    try {
        await mongoose.connect(env.MONGO_URI, { dbName: env.DB_NAME });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Doctor.deleteMany({});
        await Appointment.deleteMany({});
        console.log('✅ Cleared existing data');

        // Create users
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@hams.com',
            password: 'Admin@123456',
            phone: '+1234567890',
            role: ROLES.ADMIN,
        });

        const doctorUser = await User.create({
            name: 'Dr. John Smith',
            email: 'john@hams.com',
            password: 'Doctor@123456',
            phone: '+1234567891',
            role: ROLES.DOCTOR,
        });

        const patientUser = await User.create({
            name: 'Jane Doe',
            email: 'jane@hams.com',
            password: 'Patient@123456',
            phone: '+1234567892',
            role: ROLES.PATIENT,
        });

        console.log('✅ Created users');

        // Create doctor profile
        const doctor = await Doctor.create({
            user: doctorUser._id,
            specialization: 'Cardiology',
            qualification: 'MD, Cardiologist',
            experience: 5,
            fee: 100,
            bio: 'Experienced cardiologist with 5 years of practice.',
            availability: [
                { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', durationMinutes: 30 },
                { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', durationMinutes: 30 },
                { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', durationMinutes: 30 },
                { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', durationMinutes: 30 },
                { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', durationMinutes: 30 },
            ],
        });

        console.log('✅ Created doctor profile');

        // Create an appointment
        const now = new Date();
        const appointmentDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
        appointmentDate.setHours(10, 0, 0, 0); // Set to a specific time

        const appointment = await Appointment.create({
            patient: patientUser._id,
            doctor: doctor._id,
            date: appointmentDate,
            slotStart: '10:00',
            slotEnd: '10:30',
            status: APPOINTMENT_STATUS.SCHEDULED,
            reason: 'Annual checkup',
        });

        console.log('✅ Created appointment');

        console.log('\n✅ Database seeded successfully!');
        console.log('\nTest Credentials:');
        console.log('  Admin: admin@hams.com / Admin@123456');
        console.log('  Doctor: john@hams.com / Doctor@123456');
        console.log('  Patient: jane@hams.com / Patient@123456');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('✅ Closed database connection');
    }
};

seedDatabase();
