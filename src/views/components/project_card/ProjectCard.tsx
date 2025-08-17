import React, { useEffect, useState } from 'react';

import { DescriptionComponent, Image } from '@the7ofdiamonds/ui-ux';
import { Gallery, Project } from '@the7ofdiamonds/ui-ux';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
    project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { title, description, solution, subtitle } = project;

    const [gallery, setGallery] = useState<Gallery | null>(null);
    const [images, setImages] = useState<Array<Image> | null>(null);
    const [image, setImage] = useState<Image | null>(null);

    useEffect(() => {
        if (project?.solution?.gallery) {
            setGallery(project.solution.gallery)
        }
    }, [project?.solution?.gallery])

    useEffect(() => {
        if (gallery?.images) {
            setImages(gallery.images)
        }
    }, [gallery?.images])

    useEffect(() => {
        if (images && images.length>0) {
            setImage(images[0])
        }
    }, [images])

    return (
        <div className={`${styles['project-card']} ${styles.card}`}>
            <h3 className='title'>{title}</h3>

            {image && image.url && (
                <img
                    className={styles.photo}
                    src={image.url}
                    alt={image.title ?? ''}
                />
            )
            }

            {subtitle && <h3>{subtitle}</h3>}

            {description && <DescriptionComponent description={description} />}
        </div>
    )
}