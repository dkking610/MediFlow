import React, { useMemo } from 'react';
import Card from '../../common/Card';
import { Appointment } from '../../../types';
import { useData } from '../../../contexts/DataContext';

const ChartPlaceholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center justify-center h-full text-text-secondary bg-black/20 rounded-md">
        [Chart: {title}]
    </div>
);

const AnalyticsPage: React.FC = () => {
    const { migrants, doctors, appointments } = useData();

    const appointmentStats = useMemo(() => {
        return appointments.reduce((acc, curr) => {
            acc[curr.status] = (acc[curr.status] || 0) + 1;
            return acc;
        }, {} as Record<Appointment['status'], number>);
    }, [appointments]);

    return (
        <div className="space-y-8">
            {/* Top Level Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="text-center">
                    <h3 className="text-sm font-medium text-text-secondary">Total Migrants</h3>
                    <p className="mt-2 text-3xl font-bold text-accent-cyan">{migrants.length}</p>
                </Card>
                 <Card className="text-center">
                    <h3 className="text-sm font-medium text-text-secondary">Total Doctors</h3>
                    <p className="mt-2 text-3xl font-bold text-accent-cyan">{doctors.length}</p>
                </Card>
                 <Card className="text-center">
                    <h3 className="text-sm font-medium text-text-secondary">Upcoming Appointments</h3>
                    <p className="mt-2 text-3xl font-bold text-text-primary">{appointmentStats.Upcoming || 0}</p>
                </Card>
                 <Card className="text-center">
                    <h3 className="text-sm font-medium text-text-secondary">Completed Appointments</h3>
                    <p className="mt-2 text-3xl font-bold text-green-400">{appointmentStats.Completed || 0}</p>
                </Card>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <Card className="h-96">
                    <h3 className="text-lg font-semibold text-white mb-4">User Registrations</h3>
                    <ChartPlaceholder title="User Growth Over Last 6 Months" />
                </Card>
                <Card className="h-96">
                    <h3 className="text-lg font-semibold text-white mb-4">Disease Trends</h3>
                     <ChartPlaceholder title="Top 5 Common Diagnoses" />
                </Card>
            </div>
            
            {/* Secondary Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                 <Card>
                    <h3 className="text-lg font-semibold text-white mb-4">Appointments by Status</h3>
                    <div className="space-y-3">
                        {Object.entries(appointmentStats).map(([status, count]) => (
                            <div key={status} className="flex justify-between items-center">
                                <span className="text-sm font-medium text-text-secondary">{status}</span>
                                <span className="text-lg font-bold text-text-primary">{count}</span>
                            </div>
                        ))}
                    </div>
                </Card>
                 <Card>
                    <h3 className="text-lg font-semibold text-white mb-4">Language Preferences</h3>
                    <div className="h-48">
                        <ChartPlaceholder title="Migrant Language Distribution" />
                    </div>
                </Card>
                 <Card>
                    <h3 className="text-lg font-semibold text-white mb-4">Active Providers</h3>
                    <div className="h-48">
                        <ChartPlaceholder title="Appointments per Doctor" />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsPage;