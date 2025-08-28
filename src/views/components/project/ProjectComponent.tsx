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

import { ProjectDetailsComponent } from '@/views/components/project/Details';
import { ProjectDescription } from '@/views/components/project/ProjectDescription';
import { TheSolution } from '@/views/components/project/TheSolution';
import { TheProcess } from '@/views/components/project/TheProcess';
import { TheProblem } from '@/views/components/project/TheProblem';
import { OwnerComponent } from '@/views/components/project/OwnerComponent';

import styles from './Project.module.scss';

interface ProjectComponentProps {
  account: Organization | User;
  project: Project | null;
  skills: Skills | null;
}

export const ProjectComponent: React.FC<ProjectComponentProps> = ({ account, project, skills }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [solution, setSolution] = useState<ProjectSolution | null>(null);
  const [process, setProcess] = useState<ProjectProcess | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [problem, setProblem] = useState<ProjectProblem | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);

  const [query, setQuery] = useState<ProjectQuery | null>(null);

  useEffect(() => {
    setTitle(project?.title ?? null)
  }, [project?.title]);

  useEffect(() => {
    setSubtitle(project?.subtitle ?? null)
  }, [project?.subtitle]);

  useEffect(() => {
    setDescription(project?.description ?? null)
  }, [project?.description]);

  useEffect(() => {
    setSolution(project?.solution ?? null)
  }, [project?.solution]);

  useEffect(() => {
    setProcess(project?.process ?? null)
  }, [project?.process]);

  useEffect(() => {
    setDetails(project?.details ?? null)
  }, [project?.details]);

  useEffect(() => {
    setProblem(project?.problem ?? null)
  }, [project?.problem]);

  useEffect(() => {
    setOwner(project?.owner ?? null)
  }, [project?.owner]);

  useEffect(() => {
    setQuery(project?.query ?? null)
  }, [project?.query]);

  return (
    project &&
    <Main>
      {title && <h1 className={styles.title}>{title}</h1>}

      {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}

      {description && <ProjectDescription description={description} />}

      {solution && <TheSolution project={project} />}

      {process && <TheProcess project={project} projectQuery={query} skills={skills} />}

      {details && <ProjectDetailsComponent account={account} project={project} />}

      {problem && <TheProblem project={project} />}

      {owner && <OwnerComponent project={project} />}
    </Main>
  );
}