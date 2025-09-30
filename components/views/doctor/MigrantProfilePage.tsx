import React from 'react';
import Card from '../../common/Card';
import { MigrantProfile } from '../../../types';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';

const StethoscopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 0a5 5 0 10-7.07 7.071 5 5 0 007.07-7.071zm-9.192 9.192a5 5 0 117.07-7.07 5 5 0 01-7.07 7.07zM9 11a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;
const PillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>;
const TestTubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a4 4 0 00-5.656 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 17.657V19a2 2 0 01-2 2H8a2 2 0 01-2-2v-1.343" /></svg>;
const SyringeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;


interface MigrantProfilePageProps {
  migrant: MigrantProfile;
  onBack: () => void;
  onAddRecord: () => void;
}

const MigrantProfilePage: React.FC<MigrantProfilePageProps> = ({ migrant, onBack, onAddRecord }) => {
    const { t } = useAuth();
    const { healthRecords, prescriptions, labReports, vaccinations } = useData();
    
    const userHealthRecords = healthRecords.filter(r => r.patientId === migrant.id);
    const userPrescriptions = prescriptions.filter(p => p.patientId === migrant.id);
    const userLabReports = labReports.filter(r => r.patientId === migrant.id);
    const userVaccinations = vaccinations.filter(v => v.patientId === migrant.id);

    return (
        <div className="space-y-8">
            {/* Header and Actions */}
            <Card>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center">
                        <img src={migrant.avatarUrl} alt={migrant.name} className="w-16 h-16 rounded-full border-2 border-accent-cyan/50" />
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-white">{migrant.name}</h2>
                            <p className="text-text-secondary">ID: {migrant.id} | Phone: {migrant.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        <button onClick={onBack} className="px-4 py-2 text-sm font-medium text-text-primary bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                            {t('backToSearchResults')}
                        </button>
                        <button onClick={onAddRecord} className="px-4 py-2 text-sm font-medium text-white bg-accent-cyan/80 rounded-md hover:bg-accent-cyan transition-colors btn-pulse">
                            {t('addNewRecord')}
                        </button>
                    </div>
                </div>
            </Card>

            {/* Health Records Sections */}
             <Card>
                <h2 className="text-2xl font-semibold text-white flex items-center mb-4"><StethoscopeIcon />{t('consultations')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userHealthRecords.length > 0 ? userHealthRecords.map((record, index) => (
                        <div key={record.id} className="p-5 bg-black/20 rounded-lg border border-glow-border slide-in-up-content" style={{animationDelay: `${index * 100}ms`}}>
                            <p className="text-sm font-semibold text-text-secondary">{record.date}</p>
                            <h3 className="text-xl font-bold text-accent-cyan mt-1">{record.diagnosis}</h3>
                            <p className="text-sm text-text-primary mt-1">with {record.doctorName}</p>
                            <p className="text-text-secondary mt-3 text-sm">{record.notes}</p>
                        </div>
                    )) : <p className="text-text-secondary col-span-full">{t('noConsultationRecords')}</p>}
                </div>
            </Card>

            <Card>
                <h2 className="text-2xl font-semibold text-white flex items-center mb-4"><PillIcon />{t('prescriptions')}</h2>
                {userPrescriptions.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-black/20">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">{t('medication')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">{t('details')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">{t('date')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-glow-border">
                                {userPrescriptions.map(p => (
                                    <tr key={p.id} className="hover:bg-black/10">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{p.medication}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{p.dosage} / {p.frequency} / {p.duration}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{p.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="text-text-secondary">{t('noPrescriptionRecords')}</p>}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h2 className="text-2xl font-semibold text-white flex items-center mb-4"><TestTubeIcon />{t('labReports')}</h2>
                    <div className="space-y-4">
                        {userLabReports.length > 0 ? userLabReports.map(report => (
                             <div key={report.id} className="p-4 bg-black/20 rounded-lg border border-glow-border">
                                <p className="font-semibold text-text-primary">{report.testName}</p>
                                <p className="text-sm text-text-secondary">{report.date}</p>
                                <div className="mt-4 text-sm text-text-primary space-y-1 border-t border-glow-border pt-3">
                                    {report.results.length > 0 ? report.results.map((res, i) => (
                                        <div key={i} className="flex justify-between items-baseline">
                                            <span>{res.parameter}</span>
                                            <span className="font-mono text-right">{res.value} {res.unit} <span className="text-xs text-text-secondary">({res.referenceRange})</span></span>
                                        </div>
                                    )) : <p className="text-xs text-text-secondary">Results summarized in interpretation.</p>}
                                </div>
                                <p className="mt-4 text-sm text-text-secondary italic"><span className="font-semibold text-text-primary not-italic">Interpretation:</span> {report.interpretation}</p>
                            </div>
                        )) : <p className="text-text-secondary">{t('noLabReports')}</p>}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-2xl font-semibold text-white flex items-center mb-4"><SyringeIcon />{t('vaccinations')}</h2>
                    <div className="space-y-4">
                        {userVaccinations.length > 0 ? userVaccinations.map(vax => (
                            <div key={vax.id} className="p-4 bg-black/20 rounded-lg border border-glow-border">
                                <p className="font-semibold text-text-primary">{vax.vaccineName}</p>
                                <p className="text-sm text-text-secondary">Dose {vax.dose} on {vax.date}</p>
                            </div>
                        )) : <p className="text-text-secondary">{t('noVaccinationRecords')}</p>}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MigrantProfilePage;
