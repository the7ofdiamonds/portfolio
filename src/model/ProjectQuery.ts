import { Model } from './Model';

export type ProjectQueryObject = {
  owner: string;
  repo: string;
};

export class ProjectQuery extends Model {
  owner: string;
  repo: string;

  constructor(owner: string, repo: string) {
    super();

    this.owner = owner;
    this.repo = repo;
  }

  toProjectQueryObject(): ProjectQueryObject {
    return {
      owner: this.owner,
      repo: this.repo,
    };
  }
}