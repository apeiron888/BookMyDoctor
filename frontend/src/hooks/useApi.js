import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api.js';

export const useLogin = () =>
    useMutation({
        mutationFn: (credentials) => api.post('/auth/login', credentials),
    });

export const useRegister = () =>
    useMutation({
        mutationFn: (userData) => api.post('/auth/register', userData),
    });

export const useLogout = () =>
    useMutation({
        mutationFn: () => api.post('/auth/logout'),
    });

export const useDoctors = (filters = {}) =>
    useQuery({
        queryKey: ['doctors', filters],
        queryFn: () => api.get('/doctors', { params: filters }),
        select: (data) => data.data,
    });

export const useDoctor = (id) =>
    useQuery({
        queryKey: ['doctor', id],
        queryFn: () => api.get(`/doctors/${id}`),
        select: (data) => data.data,
        enabled: !!id,
    });

export const useAvailableSlots = (doctorId, date) =>
    useQuery({
        queryKey: ['doctor', doctorId, 'slots', date],
        queryFn: () => api.get(`/doctors/${doctorId}/slots`, { params: { date } }),
        select: (data) => data.data,
        enabled: !!doctorId && !!date,
    });

export const useBookAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (appointmentData) => api.post('/appointments', appointmentData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });
};

export const useMyAppointments = (filters = {}) =>
    useQuery({
        queryKey: ['appointments', 'my', filters],
        queryFn: () => api.get('/appointments/my', { params: filters }),
        select: (data) => data.data,
    });

export const useCancelAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.patch(`/appointments/${id}/cancel`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });
};

export const useDoctorAppointments = (filters = {}) =>
    useQuery({
        queryKey: ['appointments', 'doctor', filters],
        queryFn: () => api.get('/appointments/doctor', { params: filters }),
        select: (data) => data.data,
    });

export const useCompleteAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, notes }) => api.patch(`/appointments/${id}/complete`, { notes }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });
};
