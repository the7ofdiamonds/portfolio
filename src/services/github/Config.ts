import { Octokit } from '@octokit/rest';

import { getGithubToken } from '../../services/Config';

let instance: Octokit | null = null;

export const getGitHubHeaders = () => {
  const token = getGithubToken();
  if (!token) {
    console.error('GitHub token not found in config.');
    return null;
  }
  return {
    headers: {
      Authorization: `bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      Accept: "application/vnd.github.v4.idl"
    }
  };
};

export const getInstance = (): Octokit => {
  const token = getGithubToken();
  if (!token) {
    console.error('GitHub token not found in config.');
    return null;
  }
  if (!instance) {
    instance = new Octokit({
      auth: token
    });
  }
  return instance;
};
