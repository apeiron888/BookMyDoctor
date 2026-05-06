import { useDoctorAppointments, useCompleteAppointment } from '../../hooks/useApi.js';
import { Card, Spinner, Button, StatusBadge } from '../../components/ui/index.jsx';
import { useState } from 'react';

export const DoctorAppointmentsPage = () => {
    const [filters, setFilters] = useState({ status: '' });
    const { data, isLoading } = useDoctorAppointments(filters);
    const { mutate: completeAppointment } = useCompleteAppointment();

    if (isLoading) return <Spinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
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
                                <h3 className="text-lg font-semibold">{appointment.patient?.name}</h3>
                                <p className="text-gray-600">{appointment.patient?.email}</p>
                                <p className="mt-2">
                                    {new Date(appointment.date).toLocaleDateString()} at {appointment.slotStart}
                                </p>
                                <p className="text-sm mt-1">Reason: {appointment.reason}</p>
                                <StatusBadge status={appointment.status} />
                            </div>
                            {appointment.status === 'scheduled' && (
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        if (window.confirm('Mark as completed?')) {
                                            completeAppointment({ id: appointment._id });
                                        }
                                    }}
                                >
                                    Complete
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
