import projectImage from '@/public/projects/hhrr.webp';
import Project from '../project';

export default function SecondProject() {
    return <Project projectName='Human Resources Management' projectImage={projectImage} backgroundColor='bg-blue-100' />;
}