import { Model } from './Model';

export type RepoURLObject = {
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;
  isValid: boolean;
};

export class RepoURL extends Model {
  owner: string | null;
  repo: string | null;
  path: string | null;
  branch: string | null;
  url: string | null;
  isValid: boolean;

  constructor(url: string) {
    super();
    let parts: Array<string> = [];

    this.isValid = false;

    try {
      if (typeof url !== 'string') {
        throw new Error('URL must be a string.');
      }

      const pathname = new URL(url).pathname;
      parts = pathname.split('/');
    } catch (error) {
      const err = error as Error;
      console.error('Error creating RepoURL:', err);
    }

    if (parts.length >= 5) {
      this.isValid = true;
    }

    this.owner = parts[1] ?? null;
    this.repo = parts[2] ?? null;
    this.path = parts[4] ?? null;
    this.branch = parts[3] ?? null;
    this.url = url;
  }

  toRepoURLObject(): RepoURLObject {
    return {
      owner: this.owner,
      repo: this.repo,
      path: this.path,
      branch: this.branch,
      url: this.url,
      isValid: this.isValid,
    };
  }
}