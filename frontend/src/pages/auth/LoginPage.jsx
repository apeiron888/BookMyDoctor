import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useApi.js';
import { useAuth } from '../hooks/useAuth.js';
import { Button, Input, Card, Spinner } from '../components/ui/index.jsx';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { mutate: login, isPending } = useLogin();
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(
            { email, password },
            {
                onSuccess: (data) => {
                    sessionStorage.setItem('accessToken', data.data.accessToken);
                    authLogin(data.data.user, data.data.accessToken);
                    navigate('/dashboard');
                },
                onError: (err) => {
                    setError(err.response?.data?.message || 'Login failed');
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">HAMS</h1>
                {error && <p className="text-danger mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="primary" className="w-full" disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Don't have an account?{' '}
                    <button onClick={() => navigate('/register')} className="text-primary-600 hover:underline">
                        Register
                    </button>
                </p>
            </Card>
        </div>
    );
};
