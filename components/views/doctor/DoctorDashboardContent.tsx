import React from 'react';
import Card from '../../common/Card';
import { MigrantProfile } from '../../../types';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';

interface DoctorDashboardContentProps {
  onNavigate: (view: string) => void;
  onSelectMigrant: (migrant: MigrantProfile) => void;
}

const DoctorDashboardContent: React.FC<DoctorDashboardContentProps> = ({ onNavigate, onSelectMigrant }) => {
    const { migrants, appointments } = useData();
    const { t } = useAuth();
    const recentPatients = migrants.slice(0, 3); // Example: show first 3 migrants as recent

    const upcomingAppointmentsCount = appointments.filter(a => a.status === 'Upcoming' && new Date(a.date) >= new Date()).length;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Stats Cards */}
                <Card className="text-center slide-in-up-content interactive-card transition-transform duration-300" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-lg font-semibold text-text-secondary">{t('upcomingAppointment')}</h3>
                    <p className="mt-2 text-5xl font-bold text-accent-cyan">{upcomingAppointmentsCount}</p>
                </Card>
                <Card className="text-center slide-in-up-content interactive-card transition-transform duration-300" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-lg font-semibold text-text-secondary">{t('pendingReports')}</h3>
                    <p className="mt-2 text-5xl font-bold text-accent-pink">3</p>
                </Card>
                <Card className="text-center slide-in-up-content interactive-card transition-transform duration-300" style={{ animationDelay: '300ms' }}>
                    <h3 className="text-lg font-semibold text-text-secondary">{t('totalPatients')}</h3>
                    <p className="mt-2 text-5xl font-bold text-text-primary">{migrants.length}</p>
                </Card>
            </div>

            <Card className="slide-in-up-content" style={{ animationDelay: '400ms' }}>
                <h3 className="text-lg font-semibold text-white">{t('findMigrantRecord')}</h3>
                <div className="relative mt-2">
                    <button
                        onClick={() => onNavigate('Migrant Search')}
                        className="w-full p-3 text-left text-text-secondary bg-brand-bg/80 border border-glow-border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-accent-cyan hover:bg-white/5 transition-colors duration-200"
                    >
                        {t('searchPlaceholder')}
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-5 h-5 mt-3.5 ml-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </Card>

            <Card className="slide-in-up-content" style={{ animationDelay: '500ms' }}>
                 <h3 className="mb-4 text-lg font-semibold text-white">{t('recentPatients')}</h3>
                 <ul className="space-y-4">
                    {recentPatients.map((patient, index) => (
                        <li key={patient.id} className="flex items-center justify-between p-4 transition-all duration-300 bg-black/20 rounded-lg hover:bg-white/10 hover:scale-[1.02] slide-in-up-content" style={{ animationDelay: `${index * 100 + 600}ms` }}>
                            <div className="flex items-center">
                                <img src={patient.avatarUrl} alt={patient.name} className="w-10 h-10 rounded-full" />
                                <div className="ml-4">
                                    <p className="font-semibold text-text-primary">{patient.name}</p>
                                    <p className="text-sm text-text-secondary">{patient.id}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => onSelectMigrant(patient)}
                                className="px-4 py-2 text-sm font-medium text-white rounded-md bg-accent-cyan/80 hover:bg-accent-cyan transition-colors btn-pulse"
                            >
                                {t('viewProfile')}
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default DoctorDashboardContent;