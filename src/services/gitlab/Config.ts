
import { getConfig, getGitlabToken } from '../Config';

export const getGitLabHeaders = () => {
  try {
    const token = getGitlabToken();

    if (!token) {
      throw new Error('GitLab API token is not set. Please set the GITLAB_API_TOKEN environment variable.');
    }

    return {
      "PRIVATE-TOKEN": `${token}`,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving GitLab token: ${error.message}`);
    }
    throw new Error('Error retrieving GitLab token: unknown error');
  }
};

export const getGitLabURL = () => {
  try {
    let config = getConfig();

    if (!config || !config.gitlabURL) {
      throw new Error('GitLab URL is not set. Please set the GITLAB_URL environment variable.');
    }

    return config.gitlabURL;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving GitLab URL: ${error.message}`);
    } else {
      throw new Error('Error retrieving GitLab URL: unknown error');
    }
  }
};