import React, { useState } from 'react';
import Card from '../../common/Card';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import UploadDocumentModal from './UploadDocumentModal';
import Modal from '../../common/Modal';
import { UploadedDocument } from '../../../types';

const StethoscopeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 0a5 5 0 10-7.07 7.071 5 5 0 007.07-7.071zm-9.192 9.192a5 5 0 117.07-7.07 5 5 0 01-7.07 7.07zM9 11a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;
const PillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>;
const TestTubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a4 4 0 00-5.656 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 17.657V19a2 2 0 01-2 2H8a2 2 0 01-2-2v-1.343" /></svg>;
const SyringeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

const HealthRecordsPage: React.FC = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [viewingDocument, setViewingDocument] = useState<UploadedDocument | null>(null);
    const { user, t } = useAuth();
    const { healthRecords, prescriptions, labReports, vaccinations, uploadedDocuments } = useData();
    
    const userHealthRecords = healthRecords.filter(r => r.patientId === user?.id);
    const userPrescriptions = prescriptions.filter(p => p.patientId === user?.id);
    const userLabReports = labReports.filter(r => r.patientId === user?.id);
    const userVaccinations = vaccinations.filter(v => v.patientId === user?.id);
    const userUploadedDocuments = uploadedDocuments.filter(d => d.patientId === user?.id);

    return (
        <>
            <UploadDocumentModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
            {viewingDocument && (
                <Modal isOpen={!!viewingDocument} onClose={() => setViewingDocument(null)} title={viewingDocument.documentName}>
                    <div className="text-center p-4">
                        <p className="text-text-secondary">
                            In a real application, the contents of the document would be displayed here.
                        </p>
                        <div className="mt-6">
                            <button onClick={() => setViewingDocument(null)} className="px-4 py-2 text-sm font-medium text-white bg-accent-cyan/80 rounded-md hover:bg-accent-cyan transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="flex justify-end mb-6">
                <button 
                    onClick={() => setIsUploadModalOpen(true)}
                    className="px-5 py-2.5 font-semibold text-white rounded-lg bg-accent-pink/80 hover:bg-accent-pink transition-colors shadow-lg btn-pulse flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    {t('uploadDocument')}
                </button>
            </div>
            <div className="space-y-8">
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
                        <div className="overflow-hidden rounded-lg">
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

                <Card>
                    <h2 className="text-2xl font-semibold text-white flex items-center mb-4"><FileIcon />Uploaded Documents</h2>
                    <div className="space-y-4">
                        {userUploadedDocuments.length > 0 ? userUploadedDocuments.map(doc => (
                            <div key={doc.id} className="p-4 bg-black/20 rounded-lg border border-glow-border flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-text-primary">{doc.documentName}</p>
                                    <p className="text-sm text-text-secondary">{doc.documentType} - Uploaded on {doc.date}</p>
                                </div>
                                <button onClick={() => setViewingDocument(doc)} className="px-3 py-1 text-sm text-accent-cyan hover:underline">View</button>
                            </div>
                        )) : <p className="text-text-secondary">No documents uploaded yet.</p>}
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <h2 className="text-2xl font-semibold text-white flex items-center mb-4"><TestTubeIcon />{t('labReports')}</h2>
                         <div className="space-y-4">
                            {userLabReports.length > 0 ? userLabReports.map(report => (
                                 <div key={report.id} className="p-4 bg-black/20 rounded-lg border border-glow-border">
                                    <p className="font-semibold text-text-primary">{report.testName}</p>
                                    <p className="text-sm text-text-secondary">{report.date}</p>
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
        </>
    );
};

export default HealthRecordsPage;
