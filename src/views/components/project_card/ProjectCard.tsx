import React from 'react';

import { DescriptionComponent } from '@the7ofdiamonds/ui-ux';

import { Project } from '@/model/Project';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
    project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { title, description, solution, subtitle } = project;

    return (
        <div className={`${styles['project-card']} ${styles.card}`}>
            <h2>{title}</h2>

            {solution && solution.gallery && Array.isArray(solution.gallery.images) &&
                solution.gallery.images.length > 0 ? (
                <img
                    className={styles.photo}
                    src={solution.gallery.images[0].url}
                    alt={solution.gallery.images[0].title}
                />
            ) : (
                ''
            )}

            {subtitle && <h3>{subtitle}</h3>}

            {description && <DescriptionComponent description={description} />}
        </div>
    )
}