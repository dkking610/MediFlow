import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { DoctorProfile } from '../../../types';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({ isOpen, onClose }) => {
    const { doctors, addAppointment } = useData();
    const { user } = useAuth();
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || '');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !selectedDoctorId || !date || !time) {
            alert('Please fill all fields');
            return;
        }

        const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) as DoctorProfile;

        addAppointment({
            patientId: user.id,
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            specialization: selectedDoctor.specialization,
            date,
            time,
            status: 'Upcoming',
        });
        
        onClose(); // Close modal after booking
    };

    const inputClasses = "mt-1 block w-full px-3 py-2 bg-brand-bg/80 border border-glow-border rounded-md shadow-sm focus:outline-none focus:ring-accent-cyan focus:border-accent-cyan sm:text-sm text-text-primary";

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Book an Appointment">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-text-secondary">Doctor</label>
                    <select id="doctor" value={selectedDoctorId} onChange={e => setSelectedDoctorId(e.target.value)} className={inputClasses}>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name} ({doctor.specialization})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-text-secondary">Date</label>
                        <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-text-secondary">Time</label>
                        <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} className={inputClasses} />
                    </div>
                </div>
                <div className="flex justify-end pt-4 space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-primary bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-accent-cyan/80 rounded-md hover:bg-accent-cyan transition-colors">
                        Confirm Booking
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default BookAppointmentModal;
