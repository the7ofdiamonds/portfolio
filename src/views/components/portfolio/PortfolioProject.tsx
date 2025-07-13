import React from 'react';

import { Project } from '@the7ofdiamonds/ui-ux';

import { ProjectCard } from '../project_card/ProjectCard';

interface PortfolioProjectProps {
    project: Project
}

const PortfolioProject: React.FC<PortfolioProjectProps> = ({ project }) => {
    const { name, owner } = project;
    
    return (
        owner && owner.login && name && (<a href={`/portfolio/${owner?.login}/${name}`}>
            <ProjectCard project={project} />
        </a>)
    )
}

export default PortfolioProject