import { Feature } from './Feature';
import { Issue, IssueObject, IssueGQL } from './Issue';
import { Task } from './Task';

export interface IssuesObject {
  list: Array<IssueObject> | null;
}

export class Issues {
  list: Array<Issue> = [];
  features: Array<Issue>;
  tasks: Array<Issue>;
  design: Array<Issue>;
  development: Array<Issue>;
  delivery: Array<Issue>;

  constructor(data?: Array<IssueObject>) {
    this.list =
      data && Array.isArray(data) ? data.map((issue) => new Issue(issue)) : [];
    this.features = this.list.filter(
      (issue) => issue.type && issue.type.includes('Feature')
    );
    this.tasks = this.list.filter(
      (issue) => issue.type && issue.type.includes('Task')
    );
    this.design = this.tasks.filter(
      (issue) => issue.labels && issue.labels.includes('design')
    );
    this.development = this.tasks.filter(
      (issue) => issue.labels && issue.labels.includes('development')
    );
    this.delivery = this.tasks.filter(
      (issue) => issue.labels && issue.labels.includes('delivery')
    );
  }

  toFeatures(issues: Array<Issue>) {
    return issues
      .filter((issue) => issue.id && issue.title && issue.milestone)
      .map((issue) => {
        const feature = new Feature();
        issue.id ? feature.setID(issue.id) : null;
        issue.title ? feature.setDescription(issue.title) : null;
        issue.milestone ? feature.setVersion(issue.milestone) : null;
        return feature;
      });
  }

  toTask(issues: Array<Issue>) {
    return issues
      .map((issue) => {
        if (issue.id && issue.title && issue.state) {
          const task = new Task();
          task.fromIssue(issue);
          return task;
        }
        return null;
      })
      .filter((task): task is Task => task !== null);
  }

  fromGitHubGraphQL(issues?: Array<IssueGQL>) {
    this.list =
      issues && issues.length > 0
        ? issues.map((issueGQL) => {
            const issue = new Issue();
            issue.fromGitHubGraphQL(issueGQL);
            return issue;
          })
        : [];
  }

  toIssuesObject(): IssuesObject {
    return {
      list:
        this.list.length > 0
          ? this.list.map((issue) => issue.toIssueObject())
          : [],
    };
  }
}
