import React, { useEffect, useState } from "react";

import { Commits, ProjectProgress, ProjectStatus } from "@the7ofdiamonds/ui-ux";

import styles from './Project.module.scss';
import { ProjectCommits } from "./ProjectCommits";

interface ProjectStatusProps {
  status: ProjectStatus;
}

const Status: React.FC<ProjectStatusProps> = ({ status }) => {
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProjectProgress | null>(null);
  const [percentageComplete, setPercentageComplete] = useState<number | null>(null);
  const [commits, setCommits] = useState<Commits | null>(null);

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

  useEffect(() => { if (status?.commits) { setCommits(status.commits) } }, [status?.commits])

  const hasContent = createdAt || updatedAt || percentageComplete || commits;

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

          {commits && <ProjectCommits commits={commits} />}
        </div>}
    </>
  );
}

export default Status;
