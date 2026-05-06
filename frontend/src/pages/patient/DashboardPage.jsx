import { Card, Spinner } from '../../components/ui/index.jsx';
import { useAuth } from '../../hooks/useAuth.js';

export const PatientDashboardPage = () => {
    const { user } = useAuth();

    if (!user) return <Spinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold">Book Appointment</h2>
                    <p className="text-gray-600 mt-2">Browse our doctors and book your appointment.</p>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold">Your Appointments</h2>
                    <p className="text-gray-600 mt-2">Manage your upcoming and past appointments.</p>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold">Your Profile</h2>
                    <p className="text-gray-600 mt-2">Update your personal information.</p>
                </Card>
            </div>
        </div>
    );
};
