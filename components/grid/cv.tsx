'use client';

import { FaArrowRight } from 'react-icons/fa6';
import Anchor from '../ui/anchor';
import Card from '../ui/card';

export default function Cv() {
    return (
        <Card className='flex flex-col justify-center gap-6 p-8'>
            <h2 className='font-calistoga text-2xl max-md:text-center'>
                Want to know more about me? 🤔
            </h2>
            <p className='leading-relaxed max-md:hidden'>
                You can download my CV.
            </p>
            <div className='inline-flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between'>
                <Anchor
                    className='cancel-drag px-4 py-2'
                    href='/assets/JosePablo_CV_2025.pdf'
                    download="JosePablo_CV_2025.pdf"
                >
                    <FaArrowRight className='-rotate-45 transition-transform duration-300 group-hover:rotate-0' />
                    Download CV
                </Anchor>
            </div>
        </Card>
    );
}
