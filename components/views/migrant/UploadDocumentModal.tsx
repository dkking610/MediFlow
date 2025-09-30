import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { UploadedDocument } from '../../../types';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ isOpen, onClose }) => {
    const { addUploadedDocument } = useData();
    const { user } = useAuth();
    const [documentName, setDocumentName] = useState('');
    const [documentType, setDocumentType] = useState<'Prescription' | 'Lab Report' | 'Other'>('Other');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !documentName || !file) {
            alert('Please fill all fields and select a file.');
            return;
        }

        const newDocument: Omit<UploadedDocument, 'id'> = {
            patientId: user.id,
            documentName: documentName,
            documentType: documentType,
            date: new Date().toISOString().split('T')[0],
            fileUrl: '#', // In a real app, this would be a URL from a storage service
        };

        addUploadedDocument(newDocument);
        
        // Reset form and close
        setDocumentName('');
        setDocumentType('Other');
        setFile(null);
        onClose();
    };

    const inputClasses = "mt-1 block w-full px-3 py-2 bg-brand-bg/80 border border-glow-border rounded-md shadow-sm focus:outline-none focus:ring-accent-cyan focus:border-accent-cyan sm:text-sm text-text-primary";
    const fileInputClasses = "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-cyan/20 file:text-accent-cyan hover:file:bg-accent-cyan/30";


    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Upload a Document">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="doc-name" className="block text-sm font-medium text-text-secondary">Document Name</label>
                    <input type="text" id="doc-name" value={documentName} onChange={e => setDocumentName(e.target.value)} placeholder="e.g., Prescription from City Clinic" className={inputClasses} required />
                </div>
                <div>
                    <label htmlFor="doc-type" className="block text-sm font-medium text-text-secondary">Document Type</label>
                    <select id="doc-type" value={documentType} onChange={e => setDocumentType(e.target.value as any)} className={inputClasses}>
                        <option>Prescription</option>
                        <option>Lab Report</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="doc-file" className="block text-sm font-medium text-text-secondary">File</label>
                    <input type="file" id="doc-file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className={`${inputClasses} ${fileInputClasses}`} required />
                </div>
                <div className="flex justify-end pt-4 space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-primary bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-accent-pink/80 rounded-md hover:bg-accent-pink transition-colors">
                        Upload Document
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UploadDocumentModal;
