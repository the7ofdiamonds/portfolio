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
  const [title, setTitle] = useState<string | null>(project?.title);
  const [subtitle, setSubtitle] = useState<string | null>(project?.subtitle);
  const [description, setDescription] = useState<string | null>(project?.description);
  const [solution, setSolution] = useState<ProjectSolution | null>(project?.solution);
  const [process, setProcess] = useState<ProjectProcess | null>(project?.process);
  const [problem, setProblem] = useState<ProjectProblem | null>(project?.problem);
  const [owner, setOwner] = useState<Owner | null>(project?.owner);
  const [details, setDetails] = useState<ProjectDetails | null>(project?.details);
  const [query, setQuery] = useState<ProjectQuery | null>(project?.query);

  useEffect(() => {
    if (project?.title) {
      setTitle(project.title)
    }
  }, [project?.title]);

  useEffect(() => {
    if (project?.subtitle) {
      setSubtitle(project.subtitle)
    }
  }, [project?.subtitle]);

  useEffect(() => {
    if (project?.description) {
      setDescription(project.description)
    }
  }, [project?.description]);

  useEffect(() => {
    if (project?.solution) {
      setSolution(project.solution)
    }
  }, [project?.solution]);

  useEffect(() => {
    if (project?.process) {
      setProcess(project.process)
    }
  }, [project?.process]);

  useEffect(() => {
    if (project?.problem) {
      setProblem(project.problem)
    }
  }, [project?.problem]);

  useEffect(() => {
    if (project?.owner) {
      setOwner(project.owner)
    }
  }, [project?.owner]);

  useEffect(() => {
    if (project?.details) {
      setDetails(project.details)
    }
  }, [project?.details]);

  useEffect(() => {
    if (project?.query) {
      setQuery(project.query)
    }
  }, [project?.query]);

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