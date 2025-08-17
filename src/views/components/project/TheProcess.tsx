import React, { useEffect, useState } from 'react';

import ProjectStatusComponent from './Status';

import { Design } from '@/views/components/project/Design';
import { Development } from '@/views/components/project/Development';
import { Delivery } from '@/views/components/project/Delivery';

import {
  Project,
  ProjectDelivery,
  ProjectDesign,
  ProjectDevelopment,
  ProjectQuery,
  ProjectSolution,
  ProjectStatus,
  Skills
} from '@the7ofdiamonds/ui-ux';

import styles from './Project.module.scss';

interface ProcessProps {
  project: Project;
  projectQuery: ProjectQuery | null;
  skills: Skills | null;
}

export const TheProcess: React.FC<ProcessProps> = ({ project, projectQuery, skills }) => {
  const [solution, setSolution] = useState<ProjectSolution | null>(null);
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [design, setDesign] = useState<ProjectDesign | null>(null);
  const [development, setDevelopment] = useState<ProjectDevelopment | null>(null);
  const [delivery, setDelivery] = useState<ProjectDelivery | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

  useEffect(() => {
    if (project?.solution) {
      setSolution(project.solution)
    }
  }, [project?.solution]);

  useEffect(() => {
    if (project?.process?.status) {
      setStatus(project.process.status)
    }
  }, [project?.process?.status]);

  useEffect(() => {
    if (project?.process?.design) {
      setDesign(project.process.design)
    }
  }, [project?.process?.design]);

  useEffect(() => {
    if (project?.process?.development) {
      setDevelopment(project?.process.development)
    }
  }, [project?.process?.development]);

  useEffect(() => {
    if (project?.process?.delivery) {
      setDelivery(project.process.delivery)
    }
  }, [project?.process?.delivery]);

  useEffect(() => {
    if (projectQuery) {
      setQuery(projectQuery)
    }
  }, [projectQuery]);

  const hasContent = status || design || development || delivery;

  return (
    <>
      {hasContent && (
        <div className={`${styles['project-section'], styles['project-process']}`} id="project_process">
          <h2 className={styles.title}>the process</h2>

          {status && <ProjectStatusComponent status={status} />}

          {design && <Design design={design} projectQuery={query} />}

          {development && <Development solution={solution} development={development} projectQuery={query} skills={skills} />}

          {delivery && <Delivery delivery={delivery} projectQuery={query} />}
        </div>
      )}
    </>
  );
};