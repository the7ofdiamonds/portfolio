import { SubIssueSummary, SubIssueSummaryObject } from './SubIssueSummary';
import { UserObject, User } from './User';

export type tIssue = {
  id: string;
  number: number;
  title: string;
  state: string;
  repository: {
    nameWithOwner: string;
  };
};

export type IssueGQL = {
  id: string;
  number: number;
  title: string;
  state: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  milestone: {
    id: string;
    title: string;
  };
  issueType: {
    id: string;
    name: string;
    description: string;
  };
  labels: {
    nodes: Array<{ name: string; color: string }>;
  };
  repository: {
    name: string;
    nameWithOwner: string;
    url: string;
  };
  trackedIssues: {
    nodes: Array<tIssue>;
  };
  trackedInIssues: {
    nodes: Array<tIssue>;
  };
};

export interface IssueObject {
  id: string | number | null;
  number: number | null;
  created_at: string | null;
  updated_at: string | null;
  sub_issues_summary: SubIssueSummaryObject | null;
  title: string | null;
  body: string | null;
  state: string | null;
  type: string | null;
  milestone: string | null;
  labels: Array<string> | null;
  assignee: UserObject | null;
  assignees: Array<UserObject> | null;
  trackedBy: Array<number> | null;
  tracked: Array<tIssue> | null;
  repo: string | null;
}

export class Issue {
  id: string | number | null;
  number: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  subIssuesSummary: SubIssueSummary | null;
  title: string | null;
  body: string | null;
  state: string | null;
  type: string | null;
  milestone: string | null;
  labels: Array<string> | null;
  assignee: User | null;
  assignees: Array<User>;
  trackedBy: Array<number> | null;
  tracked: Array<tIssue> | null;
  repo: string | null;

  constructor(data?: IssueObject) {
    this.id = data?.id ? data.id : null;
    this.number = data?.number ? data.number : null;
    this.createdAt = data?.created_at ? data.created_at : null;
    this.updatedAt = data?.updated_at ? data.updated_at : null;
    this.subIssuesSummary = data?.sub_issues_summary
      ? new SubIssueSummary(data.sub_issues_summary)
      : null;
    this.title = data?.title ? data.title : null;
    this.body = data?.body ? data.body : null;
    this.state = data?.state ? data.state : null;
    this.type = data?.type ? data.type : null;
    this.milestone = data?.milestone ? data.milestone : null;
    this.labels =
      data?.labels && Array.isArray(data.labels) && data.labels.length > 0
        ? data.labels
        : null;
    this.assignee = data?.assignee ? new User(data.assignee) : null;
    this.assignees =
      data?.assignees &&
      Array.isArray(data.assignees) &&
      data.assignees.length > 0
        ? data.assignees.map((assignee) => new User(assignee))
        : [];
    this.tracked = data?.tracked ? data.tracked : null;
    this.trackedBy = data?.trackedBy ? data.trackedBy : null;
    this.repo = data?.repo ? data.repo : null;
  }

  fromGitHubGraphQL(issue: IssueGQL) {
    this.id = issue.id;
    this.number = issue.number;
    this.createdAt = issue.createdAt;
    this.updatedAt = issue.updatedAt;
    this.title = issue.title;
    this.body = issue.body;
    this.state = issue.state;
    this.type =
      issue.issueType && issue.issueType.name ? issue.issueType.name : null;
    this.labels =
      issue.labels && issue.labels.nodes
        ? issue.labels.nodes.map((label) => label.name)
        : [];
    this.tracked =
      issue.trackedIssues &&
      Array.isArray(issue.trackedIssues.nodes) &&
      issue.trackedIssues.nodes.length > 0
        ? issue.trackedIssues.nodes
        : null;
    this.trackedBy =
      issue.trackedInIssues && issue.trackedInIssues.nodes
        ? issue.trackedInIssues.nodes.map((issue) => issue.number)
        : [];
    this.repo =
      issue.repository && issue.repository.nameWithOwner
        ? issue.repository.nameWithOwner
        : null;
    this.milestone =
      issue.milestone && issue.milestone.title ? issue.milestone.title : null;
  }

  toIssueObject(): IssueObject {
    return {
      id: this.id,
      number: this.number,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      sub_issues_summary: this.subIssuesSummary
        ? this.subIssuesSummary.toSubIssueSummaryObject()
        : null,
      title: this.title,
      body: this.body,
      state: this.state,
      type: this.type,
      milestone: this.milestone,
      labels: this.labels,
      assignee: this.assignee ? this.assignee.toUserObject() : null,
      assignees: this.assignees
        ? this.assignees.map((assignee) => assignee.toUserObject())
        : [],
      tracked: this.tracked,
      trackedBy: this.trackedBy,
      repo: this.repo,
    };
  }
}