import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute, RoleRoute } from './router/index.jsx';
import { Navbar } from './components/layout/index.jsx';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage.jsx';
import { RegisterPage } from './pages/auth/RegisterPage.jsx';

// Patient Pages
import { PatientDashboardPage } from './pages/patient/DashboardPage.jsx';
import { DoctorListPage } from './pages/patient/DoctorListPage.jsx';
import { DoctorDetailPage } from './pages/patient/DoctorDetailPage.jsx';
import { MyAppointmentsPage } from './pages/patient/MyAppointmentsPage.jsx';

// Doctor Pages
import { DoctorDashboardPage } from './pages/doctor/DashboardPage.jsx';
import { DoctorAppointmentsPage } from './pages/doctor/AppointmentsPage.jsx';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/DashboardPage.jsx';
import { AdminUsersPage } from './pages/admin/UsersPage.jsx';
import { AdminAppointmentsPage } from './pages/admin/AppointmentsPage.jsx';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        {/* Auth Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Patient Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <PatientDashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/doctors"
                            element={
                                <ProtectedRoute>
                                    <DoctorListPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/doctor/:id"
                            element={
                                <ProtectedRoute>
                                    <DoctorDetailPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-appointments"
                            element={
                                <ProtectedRoute>
                                    <MyAppointmentsPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Doctor Routes */}
                        <Route
                            path="/doctor/appointments"
                            element={
                                <RoleRoute allowedRoles={['doctor']}>
                                    <DoctorAppointmentsPage />
                                </RoleRoute>
                            }
                        />

                        {/* Admin Routes */}
                        <Route
                            path="/admin/users"
                            element={
                                <RoleRoute allowedRoles={['admin']}>
                                    <AdminUsersPage />
                                </RoleRoute>
                            }
                        />
                        <Route
                            path="/admin/appointments"
                            element={
                                <RoleRoute allowedRoles={['admin']}>
                                    <AdminAppointmentsPage />
                                </RoleRoute>
                            }
                        />

                        {/* 404 & redirect */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
