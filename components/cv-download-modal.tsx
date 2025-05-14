import React from 'react';

interface CvDownloadModalProps {
  open: boolean;
  onClose: () => void;
}

const files = [
  { label: 'CV in English', href: '/CV-JOSEPABLO-EN.pdf' },
  { label: 'CV in Spanish', href: '/CV-JOSEPABLO-ES.pdf' },
];

const downloadBoth = () => {
  files.forEach(file => {
    const link = document.createElement('a');
    link.href = file.href;
    link.download = file.href.split('/').pop() || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

const CvDownloadModal: React.FC<CvDownloadModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="font-bold text-xl mb-2">Download CV</h2>
      <p className="text-gray-500 dark:text-gray-300 mb-4 text-center">Select the language of the CV you want to download:</p>
      <div className="flex flex-col gap-3 w-full">
        <a
          href="/CV-EN.pdf"
          download
          className="rounded-lg bg-black text-white dark:bg-white dark:text-black px-4 py-2 font-semibold text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition"
        >
          Download CV in English
        </a>
        <a
          href="/CV-ES.pdf"
          download
          className="rounded-lg bg-black text-white dark:bg-white dark:text-black px-4 py-2 font-semibold text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition"
        >
          Download CV in Spanish
        </a>
        <button
          onClick={downloadBoth}
          className="rounded-lg border border-black dark:border-white px-4 py-2 font-semibold text-center hover:bg-gray-100 dark:hover:bg-dark-800 transition"
        >
          Download both
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">Remember to request permission for the use of the CV. Modification is not allowed.</p>
      <button
        onClick={onClose}
        className="mt-2 text-sm text-gray-500 hover:text-black dark:hover:text-white underline"
      >
        Close
      </button>
    </div>
  );
};

export default CvDownloadModal;
