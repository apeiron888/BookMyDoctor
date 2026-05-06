import { useAuth } from '../../hooks/useAuth.js';
import { Card } from '../../components/ui/index.jsx';
import { useNavigate } from 'react-router-dom';

export const AdminDashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="cursor-pointer hover:shadow-lg" onClick={() => navigate('/admin/users')}>
                    <h2 className="text-lg font-semibold">Users</h2>
                    <p className="text-gray-600 mt-2">Manage all users</p>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg" onClick={() => navigate('/admin/doctors')}>
                    <h2 className="text-lg font-semibold">Doctors</h2>
                    <p className="text-gray-600 mt-2">Manage doctor profiles</p>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg" onClick={() => navigate('/admin/appointments')}>
                    <h2 className="text-lg font-semibold">Appointments</h2>
                    <p className="text-gray-600 mt-2">View all appointments</p>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg">
                    <h2 className="text-lg font-semibold">Reports</h2>
                    <p className="text-gray-600 mt-2">System analytics</p>
                </Card>
            </div>
        </div>
    );
};
