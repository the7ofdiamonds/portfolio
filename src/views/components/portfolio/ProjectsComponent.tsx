import React from 'react';

import { Project } from '@/model/Project';

import PortfolioProject from './PortfolioProject';

import styles from './Portfolio.module.scss';

interface ProjectsComponentProps {
  projects: Set<Project>;
}

export const ProjectsComponent: React.FC<ProjectsComponentProps> = ({ projects }) => {

  return (
    <>
      <div className={styles.projects}>
        {projects.size > 0 && (
          Array.from(projects).map((project, index) => (
            <PortfolioProject key={index} project={project} />
          ))
        )}
      </div>
    </>
  );
}