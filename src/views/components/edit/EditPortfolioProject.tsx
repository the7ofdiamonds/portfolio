import React, { useEffect, useState } from 'react'

import { Owner, Project } from '@the7ofdiamonds/ui-ux'

import { ProjectCard } from '@/views/components/project_card/ProjectCard';

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