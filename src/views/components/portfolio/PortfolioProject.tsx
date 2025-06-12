import React from 'react';

import { ProjectCard } from '../ProjectCard';

import { Project } from '@/model/Project';

interface PortfolioProjectProps {
    project: Project
}

const PortfolioProject: React.FC<PortfolioProjectProps> = ({ project }) => {
    const { name, owner } = project;
    return (
        owner && owner.login && name && (<a href={`/#/portfolio/${owner?.login}/${name}`}>
            <ProjectCard project={project} />
        </a>)
    )
}

export default PortfolioProject