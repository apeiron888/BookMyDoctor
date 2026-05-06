import { useAuth } from '../../hooks/useAuth.js';
import { useLogout } from '../../hooks/useApi.js';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { mutate: logout } = useLogout();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-primary-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-2xl font-bold">HAMS</h1>
                {isAuthenticated && (
                    <div className="flex items-center gap-6">
                        <span>Welcome, {user?.name}</span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 bg-white text-primary-600 rounded hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export const Sidebar = ({ role }) => {
    const navigate = useNavigate();

    const menu = {
        patient: [
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Doctors', path: '/doctors' },
            { label: 'My Appointments', path: '/my-appointments' },
        ],
        doctor: [
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Appointments', path: '/doctor/appointments' },
        ],
        admin: [
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Users', path: '/admin/users' },
            { label: 'Doctors', path: '/admin/doctors' },
            { label: 'Appointments', path: '/admin/appointments' },
        ],
    };

    return (
        <aside className="w-64 bg-gray-100 p-4 shadow">
            <ul className="space-y-2">
                {menu[role]?.map((item) => (
                    <li key={item.path}>
                        <button
                            onClick={() => navigate(item.path)}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export const DashboardLayout = ({ children }) => (
    <div className="flex min-h-screen">
        <Sidebar role={useAuth().user?.role} />
        <main className="flex-1 p-8">{children}</main>
    </div>
);
