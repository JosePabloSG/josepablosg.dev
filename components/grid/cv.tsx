import { FaArrowRight } from 'react-icons/fa6';
import Card from '../ui/card';

export default function Cv() {
    return (
        <Card className='flex flex-col justify-center gap-6 p-8'>
            <h2 className='font-abril-fatface text-2xl max-md:text-center'>
                Want to know more about me? 🤔
            </h2>
            <p className='leading-relaxed max-md:hidden'>
                You can download my CV.
            </p>
            <div className='inline-flex flex-col items-center gap-6 lg:flex-row'>
                <a
                    className='cancel-drag group inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full bg-white p-3 px-4 py-2 outline-hidden ring-2 ring-gray-200/45 transition-all duration-300 focus-within:outline-hidden focus-within:ring-4 hover:ring-4 dark:text-black dark:ring-gray-200/30'
                    href='/cv.pdf'
                    download={'/cv.pdf'}>
                    <FaArrowRight className='-rotate-45 transition-transform duration-300 group-hover:rotate-0' />
                    Download CV
                </a>
            </div>
        </Card>
    );
}
