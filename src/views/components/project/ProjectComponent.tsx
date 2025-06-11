import React, { useEffect, useState } from 'react';

import { ProjectDetailsComponent } from '@/views/components/project/Details';
import { DescriptionComponent } from '../DescriptionComponent';
import { TheSolution } from '@/views/components/project/TheSolution';
import { TheProcess } from '@/views/components/project/TheProcess';
import { TheProblem } from '@/views/components/project/TheProblem';
import { OwnerComponent } from '@/views/components/project/OwnerComponent';

import { Project } from '@/model/Project';
import { Account } from '@/model/Account';
import { ProjectSolution } from '@/model/ProjectSolution';
import { ProjectProcess } from '@/model/ProjectProcess';
import { ProjectDetails } from '@/model/ProjectDetails';
import { ProjectProblem } from '@/model/ProjectProblem';
import { Owner } from '@/model/Owner';
import { Skills } from '@/model/Skills';
import { ProjectSkills } from '@/model/ProjectSkills';
import { ProjectQuery } from '@/model/ProjectQuery';

import styles from './Project.module.scss';

interface ProjectComponentProps {
  account: Account;
  project: Project;
}

export const ProjectComponent: React.FC<ProjectComponentProps> = ({ account, project }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [solution, setSolution] = useState<ProjectSolution | null>(null);
  const [process, setProcess] = useState<ProjectProcess | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [problem, setProblem] = useState<ProjectProblem | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);

  const [skills, setSkills] = useState<Skills | null>(null);
  const [projectSkills, setProjectSkills] = useState<ProjectSkills | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

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
    if (account.skills) {
      setSkills(account.skills)
    }
  }, [account.skills]);

  useEffect(() => {
    if (skills && project.process?.development?.skills) {
      setProjectSkills(skills.show(project.process.development.skills))
    }
  }, [account.skills]);

  useEffect(() => {
    if (project?.process?.development && projectSkills) {
      project.process.development.setSkills(projectSkills)
      setProcess(project.process)
    }
  }, [project?.process?.development, projectSkills]);

  useEffect(() => {
    if (project?.details) {
      setDetails(project.details)
    }
  }, [project?.details]);

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
    if (project.query) {
      setQuery(project.query)
    }
  }, [project.query]);

  return (
    <>
      <main className={styles.main}>
        {title && <h1 className={styles.title}>{title}</h1>}

        {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}

        {description && <DescriptionComponent description={description} />}

        {solution && <TheSolution project={project} />}

        {process && <TheProcess project={project} projectQuery={query} />}

        {details && <ProjectDetailsComponent account={account} project={project} />}

        {problem && <TheProblem project={project} />}

        {owner && <OwnerComponent project={project} />}
      </main>
    </>
  );
}