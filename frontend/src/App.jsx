import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminStaffManagement from './pages/AdminStaffManagement';
import AdminSpecializations from './pages/AdminSpecializations';
import ReceptionDashboard from './pages/ReceptionDashboard';
import ReceptionPatients from './pages/ReceptionPatients';
import ReceptionAppointments from './pages/ReceptionAppointments';
import PharmacyDashboard from './pages/PharmacyDashboard';
import PharmacyInventory from './pages/PharmacyInventory';
import PharmacyPrescriptions from './pages/PharmacyPrescriptions';
import DoctorDashboard from './pages/DoctorDashboard';
import LabTestManagement from './pages/LabTestManagement';
import LabEvaluations from './pages/LabEvaluations';
import DoctorLabTests from './pages/DoctorLabTests';

// Mock Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    
    if (!user) return <Navigate to="/" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
    
    return children;
};

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['Administrator']}><Layout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="staff" element={<AdminStaffManagement />} />
                <Route path="departments" element={<AdminSpecializations />} />
            </Route>

            <Route path="/reception" element={<ProtectedRoute allowedRoles={['Receptionist', 'Administrator']}><Layout /></ProtectedRoute>}>
                <Route index element={<ReceptionDashboard />} />
                <Route path="patients" element={<ReceptionPatients />} />
                <Route path="appointments" element={<ReceptionAppointments />} />
            </Route>
            
            <Route path="/doctor" element={<ProtectedRoute allowedRoles={['Doctor']}><Layout /></ProtectedRoute>}>
                <Route index element={<DoctorDashboard />} />
                <Route path="lab-results" element={<DoctorLabTests />} />
            </Route>

            <Route path="/pharmacy" element={<ProtectedRoute allowedRoles={['Pharmacist', 'Administrator']}><Layout /></ProtectedRoute>}>
                <Route index element={<PharmacyDashboard />} />
                <Route path="inventory" element={<PharmacyInventory />} />
                <Route path="prescriptions" element={<PharmacyPrescriptions />} />
            </Route>

            <Route path="/lab" element={<ProtectedRoute allowedRoles={['Lab Technician', 'Administrator']}><Layout /></ProtectedRoute>}>
                <Route index element={<LabTestManagement />} />
                <Route path="evaluations" element={<LabEvaluations />} />
            </Route>
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
