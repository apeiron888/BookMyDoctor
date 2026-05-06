import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Spinner } from '../components/ui/index.jsx';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <Spinner />;
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export const RoleRoute = ({ children, allowedRoles }) => {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) return <Spinner />;
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user?.role)) return <Navigate to="/dashboard" />;

    return children;
};
