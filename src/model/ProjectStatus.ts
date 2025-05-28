import { Model } from './Model';

import { formatTime } from '@/utilities/String';
import { ProjectProgress, ProjectProgressObject } from './ProjectProgress';
import { Repo } from './Repo';
import { ProjectDataObject } from './Project';

export type ProjectStatusObject = {
  created_at: string | null;
  updated_at: string | null;
  progress: number | null;
};

export class ProjectStatus extends Model {
  createdAt: string | null;
  updatedAt: string | null;
  progress: ProjectProgress | number;

  constructor(data?: ProjectStatusObject, progress?: ProjectProgress) {
    super();

    this.createdAt = null;
    this.updatedAt = null;
    this.progress = 0;

    data?.created_at ? this.setCreatedAt(data?.created_at) : this.createdAt;
    data?.updated_at ? this.setUpdatedAt(data?.updated_at) : this.updatedAt;
    this.progress = progress ? progress : this.progress;
  }

  setCreatedAt(dateTime: string | null) {
    this.createdAt = dateTime ? formatTime(dateTime) : null;
  }

  setUpdatedAt(dateTime: string | null) {
    this.updatedAt = dateTime ? formatTime(dateTime) : null;
  }

  setProgress(progress: ProjectProgress | number) {
    this.progress = progress;
  }

  fromRepo(repo: Repo) {
    if (repo.createdAt) {
      this.setCreatedAt(repo.createdAt);
    }

    if (repo.updatedAt) {
      this.setUpdatedAt(repo.updatedAt);
    }
  }

  fromDocumentData(data: ProjectDataObject) {}

  toProjectStatusObject(): ProjectStatusObject {
    return {
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      progress:
        this.progress instanceof ProjectProgress && this.progress.completion
          ? this.progress.completion
          : typeof this.progress === 'number'
          ? this.progress
          : null,
    };
  }
}