import React from 'react';
import Modal from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div>
        <div className="text-text-secondary">{message}</div>
        <div className="flex justify-end pt-6 space-x-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-primary bg-white/10 rounded-md hover:bg-white/20 transition-colors">
            {cancelText}
          </button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-accent-pink/80 rounded-md hover:bg-accent-pink transition-colors">
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
