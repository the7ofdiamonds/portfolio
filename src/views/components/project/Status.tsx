import React, { useEffect, useState } from "react";

import { ProjectProgress } from "@/model/ProjectProgress";
import { ProjectStatus } from "@/model/ProjectStatus";

interface ProjectStatusProps {
  status: ProjectStatus;
}

const Status: React.FC<ProjectStatusProps> = ({ status }) => {
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => { if (status?.updatedAt) { setUpdatedAt(status.updatedAt) } }, [status?.updatedAt])

  useEffect(() => { if (status?.createdAt) { setCreatedAt(status.createdAt) } }, [status?.createdAt])

  useEffect(() => {
    if (status?.progress && typeof status.progress === 'number') {
      setProgress(status.progress)
    } else if (status?.progress && status.progress instanceof ProjectProgress) {
      setProgress(status.progress.completion)
    }
  }, [status.progress])

  const hasContent = createdAt || updatedAt || progress;

  return (
    <>
      {hasContent &&
        <div className="project-status">
          <h3>STATUS</h3>

          <div className="status-details">
            {createdAt && <div className="row">
              <h4>Started:</h4>
              <h5>{createdAt}</h5>
            </div>}

            {updatedAt && <div className="row">
              <h4>Updated:</h4>
              <h5>{updatedAt}</h5>
            </div>}
          </div>

          {typeof progress === 'number' && progress > 0 && (
            <div className="status-progress">
              <progress value={progress} max={100}></progress>
              <h4>{progress.toFixed(1)}% Completed</h4>
            </div>
          )}
        </div>}
    </>
  );
}

export default Status;
