import { useAuth } from '../../hooks/useAuth.js';
import { Card } from '../../components/ui/index.jsx';

export const DoctorDashboardPage = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Welcome, Dr. {user?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold">Your Appointments</h2>
                    <p className="text-gray-600 mt-2">View and manage your scheduled appointments.</p>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold">Your Profile</h2>
                    <p className="text-gray-600 mt-2">Update your professional information.</p>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold">Availability</h2>
                    <p className="text-gray-600 mt-2">Set your working hours and time slots.</p>
                </Card>
            </div>
        </div>
    );
};
