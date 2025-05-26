import { Octokit } from '@octokit/rest';

import { getToken } from '@/services/Config';

let instance: Octokit | null = null;

export const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};

export const getInstance = () => {
  if (!instance) {
    const token = getToken();
    instance = new Octokit({
      auth: token,
      'X-GitHub-Api-Version': '2022-11-28',
    });
  }
  return instance;
};
