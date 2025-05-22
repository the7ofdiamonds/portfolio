import { Model } from './Model';

export type GitHubRepoQueryObject = {
  owner: string;
  repo: string;
};

export class GitHubRepoQuery extends Model {
  owner: string;
  repo: string;
  accountType: string | null;

  constructor(owner: string, repo: string, accountType?: string) {
    super();

    this.owner = owner;
    this.repo = repo;
    this.accountType = accountType ? accountType : null;
  }

  toGitHubRepoQueryObject(): GitHubRepoQueryObject {
    return {
      owner: this.owner,
      repo: this.repo,
    };
  }
}
