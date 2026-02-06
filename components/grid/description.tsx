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
                Hi, I'm <span className='font-calistoga text-xl'>José Pablo</span>, a full-stack software developer based in Costa Rica.
                I enjoy building scalable web applications and designing modern digital experiences.
            </p>
        </Card>
    );
}
