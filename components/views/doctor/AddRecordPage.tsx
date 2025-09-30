import React, { useState } from 'react';
import { MigrantProfile } from '../../../types';
import Card from '../../common/Card';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';

interface AddRecordPageProps {
  migrant: MigrantProfile;
  onSave: () => void;
  onCancel: () => void;
}

const AddRecordPage: React.FC<AddRecordPageProps> = ({ migrant, onSave, onCancel }) => {
    const { addHealthRecordAndPrescription } = useData();
    const { user: doctor } = useAuth();

    const [diagnosis, setDiagnosis] = useState('');
    const [notes, setNotes] = useState('');
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!doctor) return;

        const today = new Date().toISOString().split('T')[0];

        const newRecord = {
            patientId: migrant.id,
            doctorId: doctor.id,
            doctorName: doctor.name,
            date: today,
            diagnosis,
            notes,
        };
        
        const newPrescription = {
            patientId: migrant.id,
            doctorId: doctor.id,
            date: today,
            medication,
            dosage,
            frequency,
            duration,
        };

        addHealthRecordAndPrescription(newRecord, newPrescription);
        onSave();
    };

    const inputClasses = "mt-1 block w-full px-3 py-2 bg-brand-bg/80 border border-glow-border rounded-md shadow-sm focus:outline-none focus:ring-accent-cyan focus:border-accent-cyan sm:text-sm text-text-primary";

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <h2 className="text-xl font-bold text-white mb-6">Add New Health Record for {migrant.name}</h2>
                
                <div className="space-y-8">
                    {/* Consultation Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-accent-cyan border-b border-glow-border pb-2 mb-4">Consultation Details</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="diagnosis" className="block text-sm font-medium text-text-secondary">Diagnosis</label>
                                <input type="text" id="diagnosis" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} className={inputClasses} required />
                            </div>
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-text-secondary">Notes / Remarks</label>
                                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={4} className={inputClasses} required></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Prescription Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-accent-cyan border-b border-glow-border pb-2 mb-4">Prescription (Optional)</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label htmlFor="medication" className="block text-sm font-medium text-text-secondary">Medication</label>
                                <input type="text" id="medication" value={medication} onChange={e => setMedication(e.target.value)} className={inputClasses} />
                            </div>
                             <div>
                                <label htmlFor="dosage" className="block text-sm font-medium text-text-secondary">Dosage</label>
                                <input type="text" id="dosage" value={dosage} onChange={e => setDosage(e.target.value)} className={inputClasses} />
                            </div>
                             <div>
                                <label htmlFor="frequency" className="block text-sm font-medium text-text-secondary">Frequency</label>
                                <input type="text" id="frequency" value={frequency} onChange={e => setFrequency(e.target.value)} className={inputClasses} />
                            </div>
                             <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-text-secondary">Duration</label>
                                <input type="text" id="duration" value={duration} onChange={e => setDuration(e.target.value)} className={inputClasses} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8 space-x-4">
                    <button type="button" onClick={onCancel} className="px-6 py-2 text-sm font-medium text-text-primary bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-accent-cyan/80 rounded-md hover:bg-accent-cyan transition-colors">
                        Save Record
                    </button>
                </div>
            </Card>
        </form>
    );
};

export default AddRecordPage;