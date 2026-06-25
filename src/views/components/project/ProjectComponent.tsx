import React, { useEffect, useState } from 'react';

import {
  Account,
  Organization,
  Owner,
  Project,
  ProjectDetails,
  ProjectProblem,
  ProjectProcess,
  ProjectSolution,
  ProjectQuery,
  Skills,
  User
} from '@the7ofdiamonds/ui-ux';
import {
  Main,
  StatusBar
} from '@the7ofdiamonds/ui-ux';

import { ProjectDetailsComponent } from '../../../views/components/project/Details';
import { ProjectDescription } from '../../../views/components/project/ProjectDescription';
import { TheSolution } from '../../../views/components/project/TheSolution';
import { TheProcess } from '../../../views/components/project/TheProcess';
import { TheProblem } from '../../../views/components/project/TheProblem';
import { OwnerComponent } from '../../../views/components/project/OwnerComponent';

import styles from './Project.module.scss';

interface ProjectComponentProps {
  account: Organization | User;
  project: Project | null;
  skills: Skills | null;
}

export const ProjectComponent: React.FC<ProjectComponentProps> = ({ account, project, skills }) => {
  const [projectData, setProjectData] = useState<Project | null>(null);

  useEffect(() => {
    setProjectData(null)
  }, []);

  useEffect(() => {
    if (project) {
      setProjectData(project)
    }
  }, [project]);

  const title = projectData?.title || null;
  const subtitle = projectData?.subtitle || null;
  const description = projectData?.description || null;
  const solution = projectData?.solution || null;
  const process = projectData?.process || null;
  const problem = projectData?.problem || null;
  const owner = projectData?.owner || null;
  const details = projectData?.details || null;
  const query = projectData?.query || null;

  return (
    project &&
    <Main>
      {title && <h1 className={styles.title}>{title}</h1>}

      {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}

      {description && <ProjectDescription description={description} />}

      {solution && <TheSolution project={project} />}

      {process && <TheProcess project={project} projectQuery={query} skills={skills} />}

      {problem && <TheProblem project={project} />}

      {owner && <OwnerComponent project={project} />}

      {details && <ProjectDetailsComponent account={account} project={project} />}
    </Main>
  );
}