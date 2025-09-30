import React, { useState } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import DoctorDashboardContent from './DoctorDashboardContent';
import MigrantSearchPage from './MigrantSearchPage';
import MigrantProfilePage from './MigrantProfilePage';
import { MigrantProfile } from '../../../types';
import AddRecordPage from './AddRecordPage';

const DoctorDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState('Dashboard');
    const [selectedMigrant, setSelectedMigrant] = useState<MigrantProfile | null>(null);
    const { user, t } = useAuth();

    const handleNavigate = (view: string) => {
        setActiveView(view);
        setSelectedMigrant(null); // Reset selected migrant on navigation
    };

    const handleSelectMigrant = (migrant: MigrantProfile) => {
        setSelectedMigrant(migrant);
        setActiveView('Migrant Profile');
    };

    const handleGoToAddRecord = () => {
        if (selectedMigrant) {
            setActiveView('Add Record');
        }
    };

    const handleSaveRecord = () => {
        setActiveView('Migrant Profile');
    };
    
    const handleCancelAddRecord = () => {
        setActiveView('Migrant Profile');
    };

    const renderContent = () => {
        if (activeView === 'Add Record' && selectedMigrant) {
            return <AddRecordPage migrant={selectedMigrant} onSave={handleSaveRecord} onCancel={handleCancelAddRecord} />;
        }
        
        if (selectedMigrant && activeView === 'Migrant Profile') {
            return <MigrantProfilePage migrant={selectedMigrant} onBack={() => handleNavigate('Migrant Search')} onAddRecord={handleGoToAddRecord} />;
        }

        switch (activeView) {
            case 'Migrant Search':
                return <MigrantSearchPage onSelectMigrant={handleSelectMigrant} />;
            case 'Dashboard':
            default:
                return <DoctorDashboardContent onNavigate={handleNavigate} onSelectMigrant={handleSelectMigrant} />;
        }
    };

    const getTitle = () => {
        if (activeView === 'Dashboard') {
            return t('welcome', { name: user?.name });
        }
        if (activeView === 'Migrant Profile' && selectedMigrant) {
            return `Profile: ${selectedMigrant.name}`;
        }
        if (activeView === 'Add Record' && selectedMigrant) {
            return `Add Record for ${selectedMigrant.name}`;
        }
        
        const viewKey = {
            'Migrant Search': 'migrantSearch',
        }[activeView] || activeView;
        return t(viewKey);
    };

    const sidebar = <Sidebar activeView={activeView} onNavigate={handleNavigate} />;

    return (
        <Layout title={getTitle()} sidebarContent={sidebar}>
            {renderContent()}
        </Layout>
    );
};

export default DoctorDashboard;