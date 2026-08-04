import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Owner, Project, ProjectQuery } from '@the7ofdiamonds/ui-ux'

import { ProjectCard } from '../../../views/components/project_card/ProjectCard';

import styles from './Edit.module.scss';

interface EditPortfolioProjectProps {
    project: Project
}

export const EditPortfolioProject: React.FC<EditPortfolioProjectProps> = ({ project }) => {
    const navigate = useNavigate();

    const [query, setQuery] = useState<ProjectQuery | null>(project?.query);
    const [owner, setOwner] = useState<string | null>(null);
    const [repo, setRepo] = useState<string | null>(null);

    useEffect(() => { if (project?.query) { setQuery(project.query) } }, [project?.query])

    useEffect(() => { if (query?.owner) { setOwner(query.owner) } }, [query?.query])

    useEffect(() => { if (query?.repo) { setRepo(query.repo) } }, [query?.repo])
       
    const onClick = () => {
        if (owner && repo) {
            navigate(`/admin/update/project/${owner}/${repo}`);
        }
    }

    return (
        <>
            {owner && repo && (<button className={styles["portfolio-project"]} onClick={onClick}>
                <ProjectCard project={project} />
            </button>)}
        </>
    )
}