import React, { useEffect, useState } from 'react'

import ProjectCard from '../../ProjectCard';

import Project from '@/model/Project'
import Owner from '@/model/Owner';

interface UpdatePortfolioProjectProps {
    project: Project
}

const UpdatePortfolioProject: React.FC<UpdatePortfolioProjectProps> = ({ project }) => {
    const [id, setID] = useState<string | null>(null);
    const [owner, setOwner] = useState<Owner | null>(null);

    useEffect(() => { setID(project.name) }, [project, setID])

    useEffect(() => { setOwner(project.owner) }, [project, setOwner])

    return (
        <>
            {owner && id && (<a className='project' href={`/#/admin/update/project/${owner.login}/${id}`}>
                <ProjectCard project={project} />
            </a>)}
        </>
    )
}

export default UpdatePortfolioProject