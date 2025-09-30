import React from 'react';
import Card from '../../common/Card';
import { useData } from '../../../contexts/DataContext';

const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const StethoscopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 0a5 5 0 10-7.07 7.071 5 5 0 007.07-7.071zm-9.192 9.192a5 5 0 117.07-7.07 5 5 0 01-7.07 7.07zM9 11a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement; colorClass: string; delay: string }> = ({ title, value, icon, colorClass, delay }) => (
    <Card className="text-center float-animation" style={{ animationDelay: delay }}>
        <div className="flex items-center justify-center space-x-3">
            {icon}
            <h3 className="text-lg font-semibold text-text-secondary">{title}</h3>
        </div>
        <p className={`mt-2 text-5xl font-bold ${colorClass}`}>{value}</p>
    </Card>
);

const AdminDashboardContent: React.FC = () => {
    const { migrants, doctors, appointments } = useData();

    return (
        <div className="space-y-8">
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Migrants" value={migrants.length.toLocaleString()} icon={<UsersIcon />} colorClass="text-accent-cyan" delay="0.1s" />
                <StatCard title="Total Doctors" value={doctors.length.toLocaleString()} icon={<StethoscopeIcon />} colorClass="text-accent-cyan" delay="0.2s" />
                <StatCard title="Appointments" value={appointments.length.toLocaleString()} icon={<CalendarIcon />} colorClass="text-text-primary" delay="0.3s" />
                <StatCard title="System Alerts" value="2" icon={<AlertIcon />} colorClass="text-accent-pink" delay="0.4s" />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                 <Card className="slide-in-up-content" style={{ animationDelay: '500ms' }}>
                     <h3 className="text-lg font-semibold text-white">User Registrations</h3>
                     <div className="flex items-center justify-center mt-4 text-text-secondary bg-black/20 h-60 rounded-md">
                         [Chart Placeholder: User Growth Over Time]
                     </div>
                 </Card>
                 <Card className="slide-in-up-content" style={{ animationDelay: '600ms' }}>
                     <h3 className="text-lg font-semibold text-white">Disease Trends</h3>
                     <div className="flex items-center justify-center mt-4 text-text-secondary bg-black/20 h-60 rounded-md">
                         [Chart Placeholder: Common Diagnoses]
                     </div>
                 </Card>
            </div>
        </div>
    );
};

export default AdminDashboardContent;