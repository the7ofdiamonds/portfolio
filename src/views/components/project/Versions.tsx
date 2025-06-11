import React from "react";

import { ProjectVersions } from '@/model/ProjectVersions';

import styles from './Project.module.scss';

interface VersionsProps {
  projectVersions: ProjectVersions;
}

export const Versions: React.FC<VersionsProps> = ({ projectVersions }) => {
  return (
    <>
      {projectVersions && (projectVersions.current || projectVersions.history.size > 0) &&
        <div className={styles['versions']}>
          {projectVersions.current &&
            <span className={styles['current-version']}>
              <h4>Current Version</h4>
              <h5>{projectVersions.current}</h5>
            </span>}
        </div>
      }
    </>
  );
}