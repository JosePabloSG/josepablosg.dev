'use client';

import { FaArrowRight } from 'react-icons/fa6';
import Anchor from '../ui/anchor';
import Card from '../ui/card';

export default function Cv() {
    return (
        <Card className='flex flex-col justify-center gap-6 p-8'>
            <h2 className='font-calistoga text-2xl max-md:text-center'>
                ¿Quieres saber más sobre mí? 🤔
            </h2>
            <p className='leading-relaxed max-md:hidden'>
                Puedes descargar mi CV.
            </p>
            <div className='inline-flex flex-col items-center gap-6 lg:flex-row'>
                <Anchor
                    className='cancel-drag px-4 py-2'
                    href='/assets/JosePablo_Suarez_CV.pdf'
                    download="JosePablo_Suarez_CV.pdf"
                >
                    <FaArrowRight className='-rotate-45 transition-transform duration-300 group-hover:rotate-0' />
                    Descargar CV
                </Anchor>
            </div>
        </Card>
    );
}
