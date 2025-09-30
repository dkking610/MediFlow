import React, { useState, useMemo } from 'react';
import Card from '../../common/Card';
import { User, UserRole } from '../../../types';
import { useData } from '../../../contexts/DataContext';
import ConfirmationModal from '../../common/ConfirmationModal';
import UserFormModal from './UserFormModal';

type Tab = 'All' | 'Migrants' | 'Doctors' | 'Admins';

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;

const UserManagementPage: React.FC = () => {
    const { getAllUsers, updateUserStatus, addUser, updateUser } = useData();
    const [activeTab, setActiveTab] = useState<Tab>('All');
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    const allUsers = useMemo(() => getAllUsers(), [getAllUsers]);

    const filteredUsers = useMemo(() => {
        const users = getAllUsers();
        switch (activeTab) {
            case 'Migrants':
                return users.filter(u => u.role === UserRole.MIGRANT);
            case 'Doctors':
                return users.filter(u => u.role === UserRole.DOCTOR);
            case 'Admins':
                return users.filter(u => u.role === UserRole.ADMIN);
            case 'All':
            default:
                return users;
        }
    }, [activeTab, allUsers, getAllUsers]);

    const handleOpenCreateModal = () => {
        setSelectedUser(null);
        setIsFormModalOpen(true);
    };
    
    const handleOpenEditModal = (user: User) => {
        setSelectedUser(user);
        setIsFormModalOpen(true);
    };

    const handleOpenConfirmModal = (user: User) => {
        setSelectedUser(user);
        setIsConfirmModalOpen(true);
    };

    const handleSaveUser = (userToSave: User) => {
        if (selectedUser) { // Editing
            updateUser(userToSave);
        } else { // Creating
             const { id, ...newUser } = userToSave; // Omit temp ID.
            addUser(newUser as Omit<User, 'id'>);
        }
        setIsFormModalOpen(false);
    };
    
    const handleConfirmToggleStatus = () => {
        if (!selectedUser) return;
        const newStatus = selectedUser.status === 'Active' ? 'Inactive' : 'Active';
        updateUserStatus(selectedUser.id, newStatus);
        setIsConfirmModalOpen(false);
        setSelectedUser(null);
    };

    const tabs: Tab[] = ['All', 'Migrants', 'Doctors', 'Admins'];

    return (
        <>
            <UserFormModal 
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSaveUser}
                user={selectedUser}
            />
            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmToggleStatus}
                title="Confirm Status Change"
                message={
                    <span>
                        Are you sure you want to set <strong>{selectedUser?.name}</strong>'s status to <strong>{selectedUser?.status === 'Active' ? 'Inactive' : 'Active'}</strong>?
                    </span>
                }
                confirmText={selectedUser?.status === 'Active' ? 'Deactivate' : 'Activate'}
            />
            <Card>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="border-b border-glow-border sm:border-b-0">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none ${
                                        activeTab === tab
                                            ? 'border-accent-cyan text-accent-cyan'
                                            : 'border-transparent text-text-secondary hover:text-white hover:border-white/50'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                     <button onClick={handleOpenCreateModal} className="flex items-center justify-center sm:w-auto w-full px-4 py-2 font-medium text-white rounded-md bg-accent-cyan/80 hover:bg-accent-cyan transition-colors btn-pulse">
                        <PlusIcon /> Create New User
                    </button>
                </div>
                
                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-black/20">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-glow-border">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-black/10 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-text-primary">{user.name}</div>
                                                <div className="text-sm text-text-secondary">{user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-400'}`}>
                                            {user.status}
                                         </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.role === UserRole.MIGRANT ? 'bg-blue-500/20 text-blue-300' :
                                            user.role === UserRole.DOCTOR ? 'bg-purple-500/20 text-purple-300' :
                                            'bg-yellow-500/20 text-yellow-300'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <button onClick={() => handleOpenEditModal(user)} className="text-accent-cyan hover:underline btn-pulse">Edit</button>
                                        <button onClick={() => handleOpenConfirmModal(user)} className={`${user.status === 'Active' ? 'text-accent-pink' : 'text-green-400'} hover:underline btn-pulse`}>
                                            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
};

export default UserManagementPage;
