import { useAuth } from './useAuth.js';

export const useRequireAuth = () => {
    const auth = useAuth();
    return auth.isAuthenticated;
};
