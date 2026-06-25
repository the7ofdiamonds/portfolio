import React from 'react';
import { Link } from 'react-router-dom';

import { Project } from '@the7ofdiamonds/ui-ux';

import { ProjectCard } from '../project_card/ProjectCard';

interface PortfolioProjectProps {
    project: Project
}

const PortfolioProject: React.FC<PortfolioProjectProps> = ({ project }) => {
    return (
       project && project?.path && (<Link to={`/${project.path}`} state={{ project }}>
            <ProjectCard project={project} />
        </Link>)
    )
}

export default PortfolioProject