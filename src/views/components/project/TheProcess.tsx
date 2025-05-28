import React, { useEffect, useState } from 'react';

import ProjectStatusComponent from './Status';

import { Design } from '@/views/components/project/Design';
import { Development } from '@/views/components/project/Development';
import { Delivery } from '@/views/components/project/Delivery';

import { ProjectStatus } from '@/model/ProjectStatus';
import { ProjectDesign } from '@/model/ProjectDesign';
import { ProjectDevelopment } from '@/model/ProjectDevelopment';
import { ProjectDelivery } from '@/model/ProjectDelivery';
import { Project } from '@/model/Project';
import { ProjectQuery } from '@/model/ProjectQuery';
import { ProjectSolution } from '@/model/ProjectSolution';

interface ProcessProps {
  project: Project;
  projectQuery: ProjectQuery | null;
}

export const TheProcess: React.FC<ProcessProps> = ({ project, projectQuery }) => {
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
        <div className="project-section project-process" id="project_process">
          <h2 className="title">the process</h2>

          {status && <ProjectStatusComponent status={status} />}

          {design && <Design design={design} projectQuery={query} />}

          {development && <Development solution={solution} development={development} projectQuery={query} />}

          {delivery && <Delivery delivery={delivery} projectQuery={query} />}
        </div>
      )}
    </>
  );
};