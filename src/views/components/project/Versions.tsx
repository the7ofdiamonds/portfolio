import React from "react";

import { ProjectVersions } from '@the7ofdiamonds/ui-ux';
import { VersionComponent } from '@the7ofdiamonds/ui-ux';

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
              <h5>
                <VersionComponent version={projectVersions.current} />
              </h5>
            </span>}

          {projectVersions.history.size > 0 &&
            (<>
              <h4>Version History</h4>
              <div className={styles['version-history']}>
                {Array.from(projectVersions.history).map((version, index) => (
                  <p key={index}><VersionComponent version={version} /></p>
                ))}
              </div>
            </>)
          }
        </div>
      }
    </>
  );
}