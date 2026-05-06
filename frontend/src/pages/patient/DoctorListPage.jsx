import { useState } from 'react';
import { useDoctors } from '../../hooks/useApi.js';
import { useNavigate } from 'react-router-dom';
import { Card, Spinner, Button, Input } from '../../components/ui/index.jsx';

export const DoctorListPage = () => {
    const [filters, setFilters] = useState({ specialization: '', name: '' });
    const { data, isLoading } = useDoctors(filters);
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>
            <div className="flex gap-4 mb-6">
                <Input
                    placeholder="Specialization"
                    value={filters.specialization}
                    onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                />
                <Input
                    placeholder="Doctor Name"
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.docs?.map((doctor) => (
                    <Card key={doctor._id}>
                        <h3 className="text-xl font-semibold">{doctor.user?.name}</h3>
                        <p className="text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm mt-2">Experience: {doctor.experience} years</p>
                        <p className="text-sm">Fee: ${doctor.fee}</p>
                        <Button
                            variant="primary"
                            className="mt-4 w-full"
                            onClick={() => navigate(`/doctor/${doctor._id}`)}
                        >
                            View Profile
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};
