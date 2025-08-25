import React from 'react';
import { Link } from 'react-router-dom';

import { Project } from '@the7ofdiamonds/ui-ux';

import { ProjectCard } from '../project_card/ProjectCard';

interface PortfolioProjectProps {
    project: Project
}

const PortfolioProject: React.FC<PortfolioProjectProps> = ({ project }) => {
    const { name, owner } = project;
    
    return (
        owner && owner.login && name && (<Link to={`/portfolio/${owner?.login}/${name}`}>
            <ProjectCard project={project} />
        </Link>)
    )
}

export default PortfolioProject