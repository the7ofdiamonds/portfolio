import React, { useEffect, useState } from 'react';

import ProjectStatusComponent from './Status';

import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

import { ProjectStatus } from '@/model/ProjectStatus';
import { ProjectDesign } from '@/model/ProjectDesign';
import { ProjectDevelopment } from '@/model/ProjectDevelopment';
import { ProjectDelivery } from '@/model/ProjectDelivery';
import { ProjectProcess } from '@/model/ProjectProcess';
import { ProjectQuery } from '@/model/ProjectQuery';

interface ProcessProps {
  process: ProjectProcess;
  projectQuery: ProjectQuery | null;
}

const TheProcess: React.FC<ProcessProps> = ({ process, projectQuery }) => {
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [design, setDesign] = useState<ProjectDesign | null>(null);
  const [development, setDevelopment] = useState<ProjectDevelopment | null>(null);
  const [delivery, setDelivery] = useState<ProjectDelivery | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

  useEffect(() => {
    if (process?.status) {
      setStatus(process.status)
    }
  }, [process?.status]);

  useEffect(() => {
    if (process?.design) {
      setDesign(process.design)
    }
  }, [process?.design]);

  useEffect(() => {
    if (process?.development) {
      setDevelopment(process.development)
    }
  }, [process?.development]);

  useEffect(() => {
    if (process?.delivery) {
      setDelivery(process.delivery)
    }
  }, [process?.delivery]);

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

          {development && <Development development={development} projectQuery={query} />}

          {delivery && <Delivery delivery={delivery} projectQuery={query} />}
        </div>
      )}
    </>
  );
};

export default TheProcess;