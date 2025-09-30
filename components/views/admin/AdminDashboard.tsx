import React, { useState } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../Sidebar';
import AdminDashboardContent from './AdminDashboardContent';
import UserManagementPage from './UserManagementPage';
import AnalyticsPage from './AnalyticsPage';
import { useAuth } from '../../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState('Dashboard');
    const { user, t } = useAuth();
    
    const renderContent = () => {
        switch (activeView) {
            case 'User Management':
                return <UserManagementPage />;
            case 'Analytics':
                return <AnalyticsPage />;
            case 'Dashboard':
            default:
                return <AdminDashboardContent />;
        }
    };
    
    const getTitle = () => {
        if (activeView === 'Dashboard') {
            return t('welcome', { name: user?.name });
        }
        const viewKey = {
            'User Management': 'userManagement',
            'Analytics': 'analytics',
        }[activeView] || activeView;
        return t(viewKey);
    };

    const sidebar = <Sidebar activeView={activeView} onNavigate={setActiveView} />;

    return (
        <Layout title={getTitle()} sidebarContent={sidebar}>
            {renderContent()}
        </Layout>
    );
};

export default AdminDashboard;