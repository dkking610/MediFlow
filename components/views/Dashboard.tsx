import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import MigrantDashboard from './migrant/MigrantDashboard';
import DoctorDashboard from './doctor/DoctorDashboard';
import AdminDashboard from './admin/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  switch (user.role) {
    case UserRole.MIGRANT:
      return <MigrantDashboard />;
    case UserRole.DOCTOR:
      return <DoctorDashboard />;
    case UserRole.ADMIN:
      return <AdminDashboard />;
    default:
      return <div>Invalid user role.</div>;
  }
};

export default Dashboard;
