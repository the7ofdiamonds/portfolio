import React, { useEffect, useState } from 'react'

import { ProjectCard } from '@/views/components/ProjectCard';

import { Project } from '@/model/Project'
import { Owner } from '@/model/Owner';

interface EditPortfolioProjectProps {
    project: Project
}

export const EditPortfolioProject: React.FC<EditPortfolioProjectProps> = ({ project }) => {
    const [id, setID] = useState<string | null>(null);
    const [owner, setOwner] = useState<Owner | null>(null);

    useEffect(() => { setID(project.id) }, [project])

    useEffect(() => { setOwner(project.owner) }, [project])

    return (
        <>
            {owner && id && (<a className='project' href={`/dashboard/edit/project/${id}`}>
                <ProjectCard project={project} />
            </a>)}
        </>
    )
}