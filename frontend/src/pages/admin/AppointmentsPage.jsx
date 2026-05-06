import { useQuery } from '@tanstack/react-query';
import api from '../../services/api.js';
import { Card, Spinner, StatusBadge } from '../../components/ui/index.jsx';
import { useState } from 'react';

const useAdminAppointments = (filters = {}) =>
    useQuery({
        queryKey: ['admin', 'appointments', filters],
        queryFn: () => api.get('/admin/appointments', { params: filters }),
        select: (data) => data.data,
    });

export const AdminAppointmentsPage = () => {
    const [filters, setFilters] = useState({ status: '' });
    const { data, isLoading } = useAdminAppointments(filters);

    if (isLoading) return <Spinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">All Appointments</h1>
            <select
                value={filters.status}
                onChange={(e) => setFilters({ status: e.target.value })}
                className="mb-4 px-4 py-2 border rounded"
            >
                <option value="">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <div className="space-y-4">
                {data?.docs?.map((appointment) => (
                    <Card key={appointment._id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold">Patient: {appointment.patient?.name}</p>
                                <p className="text-sm">Doctor: Dr. {appointment.doctor?.user?.name}</p>
                                <p className="text-sm mt-1">
                                    {new Date(appointment.date).toLocaleDateString()} at {appointment.slotStart}
                                </p>
                                <StatusBadge status={appointment.status} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
