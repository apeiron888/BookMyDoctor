import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctor, useAvailableSlots, useBookAppointment } from '../../hooks/useApi.js';
import { Card, Button, Spinner, Input } from '../../components/ui/index.jsx';

export const DoctorDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: doctor, isLoading } = useDoctor(id);
    const [selectedDate, setSelectedDate] = useState('');
    const { data: slots } = useAvailableSlots(id, selectedDate);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [reason, setReason] = useState('');
    const { mutate: bookAppointment, isPending } = useBookAppointment();

    if (isLoading) return <Spinner />;

    const handleBook = () => {
        if (!selectedSlot) {
            alert('Please select a time slot');
            return;
        }
        bookAppointment(
            { doctorId: id, date: selectedDate, slotStart: selectedSlot.slotStart, reason },
            {
                onSuccess: () => {
                    alert('Appointment booked successfully!');
                    navigate('/my-appointments');
                },
                onError: (err) => alert(err.response?.data?.message || 'Booking failed'),
            }
        );
    };

    return (
        <div>
            <Button variant="secondary" onClick={() => navigate('/doctors')} className="mb-4">
                ← Back
            </Button>
            <Card>
                <h1 className="text-3xl font-bold">{doctor?.doctor?.user?.name}</h1>
                <p className="text-lg text-gray-600">{doctor?.doctor?.specialization}</p>
                <p className="mt-4">{doctor?.doctor?.bio}</p>
                <p className="mt-2">Experience: {doctor?.doctor?.experience} years</p>
                <p className="mt-2">Fee: ${doctor?.doctor?.fee}</p>
            </Card>

            <Card className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
                <Input
                    label="Select Date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                {slots?.slots && slots.slots.length > 0 && (
                    <div className="mt-4">
                        <p className="font-semibold mb-2">Available Times:</p>
                        <div className="grid grid-cols-4 gap-2">
                            {slots.slots.map((slot) => (
                                <Button
                                    key={slot.slotStart}
                                    variant={selectedSlot?.slotStart === slot.slotStart ? 'primary' : 'secondary'}
                                    onClick={() => setSelectedSlot(slot)}
                                >
                                    {slot.slotStart}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
                <Input
                    label="Reason for Visit"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mt-4"
                />
                <Button
                    variant="primary"
                    className="mt-4 w-full"
                    onClick={handleBook}
                    disabled={isPending || !selectedSlot}
                >
                    {isPending ? 'Booking...' : 'Confirm Booking'}
                </Button>
            </Card>
        </div>
    );
};
