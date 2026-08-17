import React, { useEffect, useState } from 'react';

import {
  ProjectProcess,
  ProjectDelivery,
  ProjectDesign,
  ProjectDevelopment,
  ProjectQuery,
  ProjectStatus,
  Skills,
  Features
} from '@the7ofdiamonds/ui-ux';

import ProjectStatusComponent from './status/Status';

import { Design } from './design/Design';
import { Development } from './development/Development';
import { Delivery } from './delivery/Delivery';

import styles from './Process.module.scss';

interface ProcessProps {
  query: ProjectQuery | null;
  process: ProjectProcess;
  skills: Skills | null;
  features: Features;
}

export const TheProcess: React.FC<ProcessProps> = ({ query, process, skills, features }) => {
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [design, setDesign] = useState<ProjectDesign | null>(null);
  const [development, setDevelopment] = useState<ProjectDevelopment | null>(null);
  const [delivery, setDelivery] = useState<ProjectDelivery | null>(null);

  useEffect(() => {
    if (process?.status) {
      setStatus(process.status)
    } else {
      setStatus(null)
    }
  }, [process?.status]);

  useEffect(() => {
    if (process?.design) {
      setDesign(process.design)
    } else {
      setDesign(null)
    }
  }, [process?.design]);

  useEffect(() => {
    if (process?.development) {
      setDevelopment(process.development)
    } else {
      setDevelopment(null)
    }
  }, [process?.development]);

  useEffect(() => {
    if (process?.delivery) {
      setDelivery(process.delivery)
    } else {
      setDelivery(null)
    }
  }, [process?.delivery]);

  const hasContent = status || design || development || delivery;

  return (
    <>
      {hasContent && (
        <div className={`${styles['project-section'], styles['project-process']}`} id="project_process">
          <h2 className={styles.title}>the process</h2>

          {status && <ProjectStatusComponent status={status} />}

          {design && <Design query={query} design={design} />}

          {development && <Development query={query} development={development} skills={skills} features={features} />}

          {delivery && <Delivery query={query} delivery={delivery} />}
        </div>
      )}
    </>
  );
};