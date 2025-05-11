import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  // Simple fade/scale animation using Tailwind classes
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      aria-modal="true"
      role="dialog"
      style={{ background: 'transparent' }}
    >
      <div className="relative min-w-[320px] max-w-[90vw] pointer-events-auto">
        <div className={`bg-white dark:bg-dark-900 rounded-2xl shadow-lg p-8 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}`}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
