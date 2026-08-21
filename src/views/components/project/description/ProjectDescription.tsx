import React from 'react';

import styles from './ProjectDescription.module.scss';

interface ProjectDescriptionProps {
  description: string;
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description }) => {

  return (
    <>
      {description && (
        <div className={styles['project-description']}>
          <p>{description}</p>
        </div>
      )}
    </>
  );
}