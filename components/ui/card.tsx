import { cn } from '@/lib/utils';

export default function Card({
    className,
    children,
}: Readonly<{ className?: string; children: React.ReactNode }>) {
    return (
        <div className='size-full rounded-3xl shadow-xs transition-shadow duration-300 hover:shadow-lg'>
            <div
                className={cn(
                    'size-full overflow-hidden rounded-3xl',
                    'bg-white dark:bg-dark-900',
                    'dark:ring-1 dark:ring-dark-800',
                    className
                )}>
                {children}
            </div>
        </div>
    );
}
