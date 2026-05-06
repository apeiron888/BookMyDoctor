import { useQuery } from '@tanstack/react-query';
import api from '../../services/api.js';
import { Card, Spinner } from '../../components/ui/index.jsx';
import { useState } from 'react';

const useAdminUsers = (filters = {}) =>
    useQuery({
        queryKey: ['admin', 'users', filters],
        queryFn: () => api.get('/admin/users', { params: filters }),
        select: (data) => data.data,
    });

export const AdminUsersPage = () => {
    const [filters, setFilters] = useState({ role: '' });
    const { data, isLoading } = useAdminUsers(filters);

    if (isLoading) return <Spinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            <select
                value={filters.role}
                onChange={(e) => setFilters({ role: e.target.value })}
                className="mb-4 px-4 py-2 border rounded"
            >
                <option value="">All Roles</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
            </select>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Email</th>
                            <th className="border p-2 text-left">Role</th>
                            <th className="border p-2 text-left">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.docs?.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.role}</td>
                                <td className="border p-2">{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
