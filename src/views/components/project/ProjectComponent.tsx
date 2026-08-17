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
  User,
  Version,
  RepoURL,
  Features
} from '@the7ofdiamonds/ui-ux';
import {
  Main,
  StatusBar
} from '@the7ofdiamonds/ui-ux';

import { ProjectDescription } from './ProjectDescription';
import { TheSolution } from './the_solution/TheSolution';
import { TheProcess } from './the_process/TheProcess';
import { TheProblem } from './the_problem/TheProblem';
import { ProjectDetailsComponent } from './the_details/Details';
import { OwnerComponent } from './owner/OwnerComponent';

import styles from './Project.module.scss';

interface ProjectComponentProps {
  account: Organization | User;
  project: Project | null;
  skills: Skills | null;
}

export const ProjectComponent: React.FC<ProjectComponentProps> = ({ account, project, skills }) => {
  const [query, setQuery] = useState<ProjectQuery | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [solution, setSolution] = useState<ProjectSolution | null>(null);
  const [process, setProcess] = useState<ProjectProcess | null>(null);
  const [problem, setProblem] = useState<ProjectProblem | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);

  const [version, setVersion] = useState<Version | null>(null);
  const [repoURL, setRepoURL] = useState<RepoURL | null>(null);
  const [features, setFeatures] = useState<Features | null>(null)

  useEffect(() => {
    if (project?.query) {
      setQuery(project.query)
    } else {
      setQuery(null)
    }
  }, [project?.query]);

  useEffect(() => {
    if (project?.title) {
      setTitle(project.title)
    } else {
      setTitle(null)
    }
  }, [project?.title]);

  useEffect(() => {
    if (project?.subtitle) {
      setSubtitle(project.subtitle)
    } else {
      setSubtitle(null)
    }
  }, [project?.subtitle]);

  useEffect(() => {
    if (project?.description) {
      setDescription(project.description)
    } else {
      setDescription(null)
    }
  }, [project?.description]);

  useEffect(() => {
    if (project?.solution) {
      setSolution(project.solution)

      if (project.solution?.features) {
        setFeatures(new Features(project.solution.features))
      } else {
        setFeatures(null)
      }
    } else {
      setSolution(null)
      setFeatures(null)
    }
  }, [project?.solution]);

  useEffect(() => {
    if (project?.process) {
      setProcess(project.process)

      if (project.process.development?.versionsList?.current) {
        setVersion(new Version(project.process.development.versionsList.current))
      } else {
        setVersion(null)
      }

      if (project.process.development?.repoURL) {
        setRepoURL(project.process.development.repoURL)
      } else {
        setRepoURL(null)
      }
    } else {
      setProcess(null)
      setVersion(null)
      setRepoURL(null)
    }
  }, [project?.process]);

  useEffect(() => {
    if (project?.problem) {
      setProblem(project.problem)
    } else {
      setProblem(null)
    }
  }, [project?.problem]);

  useEffect(() => {
    if (project?.owner) {
      setOwner(project.owner)
    } else {
      setOwner(null)
    }
  }, [project?.owner]);

  useEffect(() => {
    if (project?.details) {
      setDetails(project.details)
    } else {
      setDetails(null)
    }
  }, [project?.details]);

  return (
    project &&
    <Main>
      {title && <h1 className={styles.title}>{title}</h1>}

      {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}

      {description && <ProjectDescription description={description} />}

      {solution && <TheSolution query={query} solution={solution} version={version} />}

      {process && <TheProcess query={query} process={process} skills={skills} features={features} />}

      {problem && <TheProblem query={query} problem={problem} />}

      {details && <ProjectDetailsComponent query={query} account={account} details={details} repoURL={repoURL} />}

      {owner && <OwnerComponent query={query} owner={owner} />}
    </Main>
  );
}