import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import { User, UserRole, DoctorProfile, MigrantProfile } from '../../../types';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user?: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSave, user }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.MIGRANT);
    
    // Role-specific fields
    const [specialization, setSpecialization] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (user) {
                setName(user.name);
                setRole(user.role);
                if (user.role === UserRole.DOCTOR) {
                    setSpecialization((user as DoctorProfile).specialization || '');
                }
                 if (user.role === UserRole.MIGRANT) {
                    setPhone((user as MigrantProfile).phone || '');
                }
            } else {
                // Reset form for new user
                setName('');
                setRole(UserRole.MIGRANT);
                setSpecialization('');
                setPhone('');
            }
        }
    }, [user, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const userToSave: any = {
            ...user, // This will include id, status, avatar if editing
            name,
            role,
        };
        
        if (role === UserRole.DOCTOR) {
            userToSave.specialization = specialization;
        } else if (role === UserRole.MIGRANT) {
            userToSave.phone = phone;
        }

        // Create a temp id for new users to satisfy the type, it will be replaced in DataContext
        if (!userToSave.id) {
            userToSave.id = `TEMP_ID_${Date.now()}`;
        }


        onSave(userToSave as User);
        onClose();
    };
    
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-brand-bg/80 border border-glow-border rounded-md shadow-sm focus:outline-none focus:ring-accent-cyan focus:border-accent-cyan sm:text-sm text-text-primary";

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={user ? 'Edit User' : 'Create New User'}>
             <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={inputClasses} required />
                </div>
                 <div>
                    <label htmlFor="role" className="block text-sm font-medium text-text-secondary">Role</label>
                    <select id="role" value={role} onChange={e => setRole(e.target.value as UserRole)} className={inputClasses} disabled={!!user}>
                        <option value={UserRole.MIGRANT}>Migrant</option>
                        <option value={UserRole.DOCTOR}>Doctor</option>
                        <option value={UserRole.ADMIN}>Admin</option>
                    </select>
                </div>
                {role === UserRole.MIGRANT && (
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-text-secondary">Phone Number</label>
                        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className={inputClasses} />
                    </div>
                )}
                {role === UserRole.DOCTOR && (
                    <div>
                        <label htmlFor="specialization" className="block text-sm font-medium text-text-secondary">Specialization</label>
                        <input type="text" id="specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} className={inputClasses} />
                    </div>
                )}

                <div className="flex justify-end pt-4 space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-primary bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-accent-cyan/80 rounded-md hover:bg-accent-cyan transition-colors">
                        Save User
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UserFormModal;
