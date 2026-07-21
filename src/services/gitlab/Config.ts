
import { getConfig, getGitlabToken } from '../Config';

export const getGitLabHeaders = () => {
  try {
    const token = getGitlabToken();

    if (!token) {
      console.error('GitLab API token is not set. Please set the GITLAB_API_TOKEN environment variable.');
      return null;
    }

    return {
      "PRIVATE-TOKEN": `${token}`,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error retrieving GitLab token: ${error.message}`);
    }
    console.error('Error retrieving GitLab token: unknown error');
  }
};

export const getGitLabURL = () => {
  try {
    let config = getConfig();

    if (!config || !config.gitlabURL) {
      console.error('GitLab URL is not set. Please set the GITLAB_URL environment variable.');
      return null;
    }

    return config.gitlabURL;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error retrieving GitLab URL: ${error.message}`);
    } else {
      console.error('Error retrieving GitLab URL: unknown error');
    }
  }
};