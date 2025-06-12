import React from 'react';

import styles from './Description.module.scss';

interface ProjectDescriptionProps {
  description: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description }) => {

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

export default ProjectDescription;
