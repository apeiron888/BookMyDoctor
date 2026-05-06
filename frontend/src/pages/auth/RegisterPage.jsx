import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useApi.js';
import { useAuth } from '../hooks/useAuth.js';
import { Button, Input, Card } from '../components/ui/index.jsx';

export const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
    const [error, setError] = useState('');
    const { mutate: register, isPending } = useRegister();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData, {
            onSuccess: (data) => {
                sessionStorage.setItem('accessToken', data.data.accessToken);
                login(data.data.user, data.data.accessToken);
                navigate('/dashboard');
            },
            onError: (err) => {
                setError(err.response?.data?.message || 'Registration failed');
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-96">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                {error && <p className="text-danger mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="primary" className="w-full" disabled={isPending}>
                        {isPending ? 'Registering...' : 'Register'}
                    </Button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="text-primary-600 hover:underline">
                        Login
                    </button>
                </p>
            </Card>
        </div>
    );
};
