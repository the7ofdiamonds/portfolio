import React, { useEffect, useState } from "react";

import { ProjectProgress, ProjectStatus } from "@the7ofdiamonds/ui-ux";

import styles from './Project.module.scss';

interface ProjectStatusProps {
  status: ProjectStatus;
}

const Status: React.FC<ProjectStatusProps> = ({ status }) => {
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProjectProgress | null>(null);
  const [percentageComplete, setPercentageComplete] = useState<number | null>(null);

  useEffect(() => { if (status?.updatedAt) { setUpdatedAt(status.updatedAt) } }, [status?.updatedAt])

  useEffect(() => { if (status?.createdAt) { setCreatedAt(status.createdAt) } }, [status?.createdAt])

  useEffect(() => {
    if (status?.progress) {
      setProgress(status.progress)
    }
  }, [status?.progress])

  useEffect(() => {
    if (progress && progress?.completion > 0) {
      setPercentageComplete(progress.completion)
    }
  }, [progress?.completion])

  const hasContent = createdAt || updatedAt || percentageComplete;

  return (
    <>
      {hasContent &&
        <div className={styles['project-status']}>
          <h3>STATUS</h3>

          <div className={styles['status-details']}>
            {createdAt && <div className={styles.row}>
              <h4>Started:</h4>
              <h5>{createdAt}</h5>
            </div>}

            {updatedAt && <div className={styles.row}>
              <h4>Updated:</h4>
              <h5>{updatedAt}</h5>
            </div>}
          </div>

          {percentageComplete && (
            <div className={styles['status-progress']}>
              <progress value={percentageComplete} max={100}></progress>
              <h4>{percentageComplete.toFixed(1)}% Completed</h4>
            </div>
          )}
        </div>}
    </>
  );
}

export default Status;
