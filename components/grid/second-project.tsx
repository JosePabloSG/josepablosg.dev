import projectImage from '@/public/projects/human-resources-management.png';
import Project from '../project';

export default function SecondProject() {
    return <Project projectName='Human Resources Management' projectImage={projectImage} backgroundColor='bg-blue-100' />;
}