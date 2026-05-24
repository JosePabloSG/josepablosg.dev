import profile from '../../public/images/Profile.jpg';
import Image from 'next/image';
import Card from '../ui/card';

export default function Description() {
    return (
        <Card className='flex flex-col justify-center gap-4 p-8'>
            <div className='relative size-20 overflow-hidden rounded-full sm:size-24'>
                <Image
                    src={profile}
                    alt='JosePabloSG'
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    placeholder='blur'
                    priority
                />
            </div>
            <p className='leading-relaxed'>
                Hola, soy <span className='font-calistoga text-xl'>José Pablo</span>, desarrollador de software full-stack en Costa Rica.
                Me apasiona construir aplicaciones web escalables y diseñar experiencias digitales modernas.
            </p>
        </Card>
    );
}
