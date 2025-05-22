import { Issue, tIssue } from './Issue';
import { Model } from './Model';
import { ProjectQuery } from './ProjectQuery';

export type tTask = {
  id: string | number;
  description: string;
  status: boolean;
  details: string;
  weight: number;
  link: string;
};

export type TaskObject = {
  id: string | number | null;
  description: string | null;
  status: boolean;
  details: string | null;
  weight: number;
  link: string | null;
  subTasks: Array<TaskObject> | null;
};

export type TaskDataObject = {
  id: string | number | null;
  description: string | null;
  status: boolean;
  details: string | null;
  weight: number;
  link: string | null;
};

export class Task extends Model {
  id: string | number | null;
  description: string | null;
  status: boolean;
  details: string | null;
  weight: number;
  link: string | null;
  subTasks: Array<Task> | null;

  constructor(data?: TaskObject) {
    super();

    this.id = data?.id ?? '';
    this.description = data?.description ?? '';
    this.status = data?.status ?? false;
    this.details = data?.details ?? '';
    this.weight = data?.weight ?? 0;
    this.link = data?.link ? data.link : null;
    this.subTasks = data?.subTasks
      ? data.subTasks.map((typeTask) => {
          const task = new Task(typeTask);
          return task;
        })
      : [];
  }

  setID(id: string | number) {
    this.id = id;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setStatus(status: boolean) {
    this.status = status;
  }

  setDetails(details: string) {
    this.details = details;
  }

  setWeight(weight: number) {
    this.weight = weight;
  }

  setSubTask(issuesType: Array<tIssue>) {
    this.subTasks = issuesType.map((issue) => {
      const task = new Task();
      task.fromIssueType(issue);
      return task;
    });
  }

  fromIssue(issue: Issue) {
    this.id = issue.id ? issue.id : null;
    this.description = issue.title ? issue.title : null;
    this.status = issue.state === 'OPEN' ? false : true;
    this.link = issue.repo;
    issue.tracked && Array.isArray(issue.tracked)
      ? this.setSubTask(issue.tracked)
      : null;
  }

  fromIssueType(issue: tIssue) {
    this.id = issue.id;
    this.description = issue.title;
    this.status = issue.state === 'OPEN' ? false : true;
    this.link = issue.repository.nameWithOwner;
  }

  fromSameProject(projectQuery: ProjectQuery): boolean {
    if (this.link) {
      const linkParts = this.link.split('/');
      const owner = linkParts[0];
      const name = linkParts[1];

      return projectQuery.owner === owner && projectQuery.repo === name;
    }

    return false;
  }

  toTaskObject(): TaskObject {
    return {
      id: this.id,
      description: this.description,
      status: this.status,
      details: this.details,
      weight: this.weight,
      link: this.link,
      subTasks: this.subTasks
        ? this.subTasks.map((task) => {
            return task.toTaskObject();
          })
        : null,
    };
  }
}
