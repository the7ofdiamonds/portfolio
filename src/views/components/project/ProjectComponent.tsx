import React, { useEffect, useState } from 'react';

import { ProjectDetailsComponent } from '@/views/components/project/Details';
import { ProjectDescription } from '@/views/components/project/ProjectDescription';
import { TheSolution } from '@/views/components/project/TheSolution';
import { TheProcess } from '@/views/components/project/TheProcess';
import { TheProblem } from '@/views/components/project/TheProblem';
import { OwnerComponent } from '@/views/components/project/OwnerComponent';

import {
  Account,
  Owner,
  Project,
  ProjectDetails,
  ProjectProblem,
  ProjectProcess,
  ProjectSolution,
  ProjectQuery,
  Skills
} from '@the7ofdiamonds/ui-ux';

import styles from './Project.module.scss';

interface ProjectComponentProps {
  account: Account;
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
    if (project && project.title) {
      setTitle(project.title)
    }
  }, [project?.title]);

  useEffect(() => {
    if (project && project.subtitle) {
      setSubtitle(project.subtitle)
    }
  }, [project?.subtitle]);

  useEffect(() => {
    if (project && project.description) {
      setDescription(project.description)
    }
  }, [project?.description]);

  useEffect(() => {
    if (project && project.solution) {
      setSolution(project.solution)
    }
  }, [project?.solution]);

  useEffect(() => {
    if (project && project.process) {
      setProcess(project.process)
    }
  }, [project?.process]);

  useEffect(() => {
    if (project && project.details) {
      setDetails(project.details)
    }
  }, [project?.details]);

  useEffect(() => {
    if (project && project.problem) {
      setProblem(project.problem)
    }
  }, [project?.problem]);

  useEffect(() => {
    if (project && project.owner) {
      setOwner(project.owner)
    }
  }, [project?.owner]);

  useEffect(() => {
    if (project && project.query) {
      setQuery(project.query)
    }
  }, [project?.query]);

  return (
    project &&
     <main className={styles.main}>
      {title && <h1 className={styles.title}>{title}</h1>}

      {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}

      {description && <ProjectDescription description={description} />}

      {solution && <TheSolution project={project} />}

      {process && <TheProcess project={project} projectQuery={query} skills={skills} />}

      {details && <ProjectDetailsComponent account={account} project={project} />}

      {problem && <TheProblem project={project} />}

      {owner && <OwnerComponent project={project} />}
    </main>
  );
}