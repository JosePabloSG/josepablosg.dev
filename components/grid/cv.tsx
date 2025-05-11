'use client';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Card from '../ui/card';
import Modal from '../modal';
import CvDownloadModal from '../cv-download-modal';
import { AnimatePresence, motion } from 'framer-motion';

const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

export default function Cv() {
    const [open, setOpen] = useState(false);
    const [showMobileOptions, setShowMobileOptions] = useState(false);

    const handleDownloadClick = () => {
        if (isMobile()) {
            setShowMobileOptions(true);
        } else {
            setOpen(true);
        }
    };

    const handleCloseMobileOptions = () => setShowMobileOptions(false);

    return (
        <Card className="flex flex-col justify-center gap-6 p-8">
            <h2 className="font-calistoga text-2xl max-md:text-center">
                Want to know more about me? 🤔
            </h2>
            <p className="leading-relaxed max-md:hidden">
                You can download my CV.
            </p>
            <div className="inline-flex flex-col items-center gap-6 lg:flex-row w-full">
                <AnimatePresence mode="wait">
                    {!showMobileOptions ? (
                        <button
                            key="download-trigger"
                            className="group inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full bg-white p-3 px-4 py-2 outline-hidden ring-2 ring-gray-200/45 transition-all duration-300 focus-within:outline-hidden focus-within:ring-4 hover:ring-4 dark:text-black dark:ring-gray-200/30"
                            onClick={handleDownloadClick}
                        >
                            <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                            Download CV
                        </button>
                    ) : (
                        <motion.div
                            key="download-options"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-3 w-full items-center"
                        >
                            <a
                                href="/CV-EN.pdf"
                                download
                                className="rounded-lg bg-black text-white dark:bg-white dark:text-black px-4 py-2 font-semibold text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition w-full"
                            >
                                Download CV (English)
                            </a>
                            <a
                                href="/CV-ES.pdf"
                                download
                                className="rounded-lg bg-black text-white dark:bg-white dark:text-black px-4 py-2 font-semibold text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition w-full"
                            >
                                Download CV (Spanish)
                            </a>
                            <button
                                onClick={handleCloseMobileOptions}
                                className="mt-2 text-sm text-gray-500 hover:text-black dark:hover:text-white underline"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <CvDownloadModal open={open} onClose={() => setOpen(false)} />
            </Modal>
        </Card>
    );
}
