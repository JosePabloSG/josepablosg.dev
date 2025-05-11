'use client';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Card from '../ui/card';
import Modal from '../modal';
import CvDownloadModal from '../cv-download-modal';

export default function Cv() {
    const [open, setOpen] = useState(false);
    return (
        <Card className='flex flex-col justify-center gap-6 p-8'>
            <h2 className='font-calistoga text-2xl max-md:text-center'>
                Want to know more about me? 🤔
            </h2>
            <p className='leading-relaxed max-md:hidden'>
                You can download my CV.
            </p>
            <div className='inline-flex flex-col items-center gap-6 lg:flex-row'>
                <button
                    className='cancel-drag group inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full bg-white p-3 px-4 py-2 outline-hidden ring-2 ring-gray-200/45 transition-all duration-300 focus-within:outline-hidden focus-within:ring-4 hover:ring-4 dark:text-black dark:ring-gray-200/30'
                    onClick={() => setOpen(true)}
                >
                    <FaArrowRight className='-rotate-45 transition-transform duration-300 group-hover:rotate-0' />
                    Descargar CV
                </button>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <CvDownloadModal open={open} onClose={() => setOpen(false)} />
            </Modal>
        </Card>
    );
}
