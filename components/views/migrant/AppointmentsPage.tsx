import React, { useState } from 'react';
import { Appointment } from '../../../types';
import Card from '../../common/Card';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import BookAppointmentModal from './BookAppointmentModal';

const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
        case 'Upcoming':
            return <span className="px-2.5 py-1 text-xs font-semibold text-accent-cyan bg-accent-cyan/20 rounded-full">{status}</span>;
        case 'Completed':
            return <span className="px-2.5 py-1 text-xs font-semibold text-green-300 bg-green-500/20 rounded-full">{status}</span>;
        case 'Cancelled':
            return <span className="px-2.5 py-1 text-xs font-semibold text-red-400 bg-red-500/20 rounded-full">{status}</span>;
        default:
            return null;
    }
};

const AppointmentCard: React.FC<{ appointment: Appointment, style?: React.CSSProperties }> = ({ appointment, style }) => {
    return (
        <div style={style} className="p-5 bg-black/20 rounded-lg border border-glow-border transition-transform duration-300 slide-in-up-content interactive-card">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-text-primary">{appointment.doctorName}</h3>
                    <p className="text-sm text-text-secondary">{appointment.specialization}</p>
                </div>
                {getStatusBadge(appointment.status)}
            </div>
            <div className="flex items-center mt-4 text-sm text-text-primary">
                <div className="flex items-center">
                    <CalendarIcon />
                    <span>{appointment.date}</span>
                </div>
                <div className="flex items-center ml-6">
                    <ClockIcon />
                    <span>{appointment.time}</span>
                </div>
            </div>
        </div>
    );
};

const AppointmentsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, t } = useAuth();
    const { appointments } = useData();

    const userAppointments = appointments.filter(a => a.patientId === user?.id);

    const upcomingAppointments = userAppointments.filter(a => a.status === 'Upcoming');
    const pastAppointments = userAppointments.filter(a => a.status !== 'Upcoming').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <>
            <BookAppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="space-y-8">
                <div className="flex items-center justify-end">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-2.5 font-semibold text-white rounded-lg bg-accent-cyan/80 hover:bg-accent-cyan transition-colors shadow-lg btn-pulse">
                        {t('bookNewAppointment')}
                    </button>
                </div>
                
                <Card className="slide-in-up-content" style={{animationDelay: '100ms'}}>
                    <h3 className="mb-4 text-xl font-semibold text-white">{t('upcoming')}</h3>
                    {upcomingAppointments.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {upcomingAppointments.map((app, index) => <AppointmentCard key={app.id} appointment={app} style={{animationDelay: `${index * 100 + 200}ms`}} />)}
                        </div>
                    ) : (
                        <p className="px-4 py-6 text-center bg-black/20 rounded-md text-text-secondary">{t('noUpcomingAppointments')}</p>
                    )}
                </Card>

                <Card className="slide-in-up-content" style={{animationDelay: '300ms'}}>
                    <h3 className="mb-4 text-xl font-semibold text-white">{t('history')}</h3>
                    {pastAppointments.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {pastAppointments.map((app, index) => <AppointmentCard key={app.id} appointment={app} style={{animationDelay: `${index * 100 + 400}ms`}} />)}
                        </div>
                    ) : (
                         <p className="px-4 py-6 text-center bg-black/20 rounded-md text-text-secondary">{t('noPastAppointments')}</p>
                    )}
                </Card>
            </div>
        </>
    );
};

export default AppointmentsPage;