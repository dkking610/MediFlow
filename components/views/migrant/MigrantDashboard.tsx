import React, { useState } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import DashboardContent from './DashboardContent';
import HealthRecordsPage from './HealthRecordsPage';
import AppointmentsPage from './AppointmentsPage';
import AIChatbotPage from './AIChatbotPage';

const MigrantDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState('Dashboard');
    const { user, t } = useAuth();

    const handleNavigate = (view: string) => {
        setActiveView(view);
    };

    const renderContent = () => {
        switch (activeView) {
            case 'Health Records':
                return <HealthRecordsPage />;
            case 'Appointments':
                return <AppointmentsPage />;
            case 'AI Chatbot':
                return <AIChatbotPage />;
            case 'Dashboard':
            default:
                return <DashboardContent onNavigate={handleNavigate} />;
        }
    };

    const getTitle = () => {
        if (activeView === 'Dashboard') {
            return t('welcomeBack', { name: user?.name });
        }
        const viewKey = {
            'Health Records': 'healthRecords',
            'Appointments': 'appointments',
            'AI Chatbot': 'aiChatbot',
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

export default MigrantDashboard;