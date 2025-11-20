import projectImage from '../../public/projects/shrinkily-app.png';
import Project from '../project';

export default function FirstProject() {
    return (
        <Project
            projectName='Shrinkily app'
            projectImage={projectImage}
            backgroundColor='bg-purple-100'
        />
    );
}