import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { Octokit } from '@octokit/rest';

import { getHeaders, getInstance } from '@/services/github/Config';
import { graphql } from '@octokit/graphql';
import {
  GetResponseDataTypeFromEndpointMethod,
  GetResponseTypeFromEndpointMethod,
} from '@octokit/types';
import { RequestError } from '@octokit/request-error';

import { RepoContent } from '@/model/RepoContent';
import { GitHubRepoQuery } from '@/model/GitHubRepoQuery';
import { RepoContentQuery } from '@/model/RepoContentQuery';
import {
  Organization,
  OrganizationObject,
  OrganizationResponseGQL,
} from '@/model/Organization';
import { Repo, RepoObject } from '@/model/Repo';
import { UserGQLResponse, UserObject, User } from '@/model/User';
import { Repos } from '@/model/Repos';
import { ContactMethods } from '@/model/ContactMethods';
import { RepoAPIURL } from '@/model/RepoAPIURL';
import { IssueGQL } from '@/model/Issue';
import { Issues, IssuesObject } from '@/model/Issues';
import { Contributors, ContributorsObject } from '@/model/Contributors';

type OctokitResponse<T = any, S = number> = {
  data: T;
  status: S;
};

export interface GithubState {
  githubLoading: boolean;
  githubStatusCode: number;
  githubError: Error | null;
  githubErrorMessage: string | null;
  userObject: UserObject | null;
  organizationObject: OrganizationObject | null;
  organizationReposObject: Array<RepoObject> | null;
  organizationsObject: Array<OrganizationObject> | null;
  organizationDetailsList: Array<Record<string, any>> | null;
  // repos: ReposObject | null;
  repoDetailsList: Array<Record<string, any>> | null;
  socialAccounts: SocialAccounts | null;
  repoObject: RepoObject | null;
  repoLanguages: Array<Record<string, any>> | null;
  contents: Array<Record<string, any>> | null;
  file: string | null;
  contributorsObject: ContributorsObject | null;
  organizationProjects: Array<Record<string, any>> | null;
  issues: IssuesObject | null;
}

const initialState: GithubState = {
  githubLoading: false,
  githubStatusCode: 0,
  githubError: null,
  githubErrorMessage: '',
  userObject: null,
  organizationObject: null,
  organizationReposObject: null,
  organizationsObject: null,
  organizationDetailsList: null,
  // repos: null,
  repoDetailsList: null,
  socialAccounts: null,
  repoObject: null,
  repoLanguages: null,
  contents: null,
  file: null,
  contributorsObject: null,
  organizationProjects: null,
  issues: null,
};

const octokit = new Octokit();

type SocialAccountsResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.users.listSocialAccountsForUser
>;

export type SocialAccounts = SocialAccountsResponse['data'];

export type SocialAccount = SocialAccounts[number];

export const getSocialAccounts = createAsyncThunk(
  'github/getSocialAccounts',
  async (username: string) => {
    try {
      const octokit = getInstance();

      const response: SocialAccountsResponse =
        await octokit.rest.users.listSocialAccountsForUser({ username });

      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

type RepoResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>;

export type GitHubRepo = RepoResponse['data'];

export const getRepo = createAsyncThunk(
  'github/getRepo',
  async (query: GitHubRepoQuery, { rejectWithValue }) => {
    try {
      if (query.owner && query.repo) {
        const octokit = getInstance();

        const repoResponse: RepoResponse = await octokit.rest.repos.get({
          owner: query.owner,
          repo: query.repo,
        });

        if (repoResponse.status === 200) {
          const repo = new Repo();
          repo.fromGitHub(repoResponse.data);
          return repo.toRepoObject();
        }

        return rejectWithValue('Unexpected response status.');
      }

      return rejectWithValue('Missing owner or repo name.');
    } catch (error) {
      if (error instanceof RequestError && error.status === 404) {
        return rejectWithValue('Project could not be found or does not exist.');
      }

      const err = error as Error;
      return rejectWithValue(err.message || 'An unknown error occurred.');
    }
  }
);

type RepoContentsResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.getContent
>;

export type GitHubContents = RepoContentsResponse['data'];

export const getRepoContents = createAsyncThunk(
  'github/getRepoContents',
  async (query: GitHubRepoQuery) => {
    try {
      const octokit = getInstance();

      const repoContents: RepoContentsResponse =
        await octokit.rest.repos.getContent({
          owner: query.owner,
          repo: query.repo,
          path: '',
        });

      let contents: Array<Record<string, any>> = [];

      if (Array.isArray(repoContents.data) && repoContents.data.length > 0) {
        repoContents.data.forEach((content) => {
          contents.push(new RepoContent(content).toObject());
        });
      }

      return contents;
    } catch (error) {
      const err = error as Error;
      console.warn(err);
    }
  }
);

type RepoLanguagesResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.listLanguages
>;

export type GitHubLanguages = RepoLanguagesResponse['data'];

export const getRepoLanguages = createAsyncThunk(
  'github/getRepoLanguages',
  async (query: GitHubRepoQuery) => {
    try {
      const octokit = getInstance();

      const repoLanguages: RepoLanguagesResponse =
        await octokit.rest.repos.listLanguages({
          owner: query.owner,
          repo: query.repo,
        });

      if (!repoLanguages.data) return [];

      return Object.entries(repoLanguages.data).map(([language, usage]) => ({
        language,
        usage: usage as number,
      }));
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }
);

type RepoContributorsResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.listContributors
>;

export type RepoContributors = RepoContributorsResponse['data'];

export type RepoContributor = RepoContributors[number];

export const getContributors = createAsyncThunk(
  'github/getContributors',
  async (query: GitHubRepoQuery) => {
    try {
      const octokit = getInstance();

      const repoContributors: RepoContributorsResponse =
        await octokit.rest.repos.listContributors({
          owner: query.owner,
          repo: query.repo,
        });

      if (repoContributors.data) {
        const contributors = new Contributors();
        const tRepoContributors = repoContributors.data as RepoContributors;
        contributors.fromGitHub(tRepoContributors);

        return contributors.toContributorsObject();
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

// type CommitsResponse = GetResponseTypeFromEndpointMethod<
//   typeof octokit.rest.repos.ge
// >;

// export type GitHubContents = RepoContentsResponse['data'];

// export const getCommits = createAsyncThunk(
//   'github/getCommits',
//   async (username: string) => {
//     try {
//       const response:CommitsResponse = await octokit.request(`users/${username}/repos`);

//       console.log(response);

//       return response;
//     } catch (error) {
//       const err = error as Error;
//       console.error(err);
//       throw new Error(err.message);
//     }
//   }
// );

type RepoFileResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.getContent
>;

export type GitHubRepoFile = RepoFileResponse['data'];

export const getRepoFile = async (query: RepoContentQuery) => {
  try {
    const octokit = getInstance();

    const { owner, repo, path, branch } = query;

    const response: OctokitResponse = await octokit.repos.getContent({
      owner: owner,
      repo: repo,
      path: path,
      ref: branch,
    });

    return atob(response.data.content);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
};

type IssuesGQL = {
  repository: {
    issues: {
      nodes: Array<IssueGQL>;
    };
  };
};

export const getIssues = createAsyncThunk(
  'github/getIssues',
  async (url: string) => {
    try {
      const repoURL = new RepoAPIURL(url);

      const queryIssues = `
        query ($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            issues(first: 20) {
              nodes {
                number
              }
            }
          }
        }
      `;

      const headers = getHeaders();

      const issuesGQL = await graphql<IssuesGQL>(queryIssues, {
        owner: repoURL.owner,
        repo: repoURL.repo,
        headers: headers,
      });

      let issueNums: Array<number> = issuesGQL.repository.issues.nodes.map(
        (issue) => issue.number
      );

      const queryIssue = `query($owner: String!, $repo: String!, $issueNumber: Int!) {
        repository(owner: $owner, name: $repo) {
          issue(number: $issueNumber) {
            id
            createdAt
            updatedAt
            title
            body
            number
            state
            issueType {
              id
              name
              description
            }
            milestone {
              id
              title
            }
            labels(first: 10) {
              nodes {
                name
                color
              }
            }
            repository {
              nameWithOwner
            }
            trackedIssues(first: 20) {
              nodes {
                id
                number
                title
                state
                repository {
                  nameWithOwner
                }
              }
            }
            trackedInIssues(first: 10) {
              nodes {
                id
                number
                title
                state
              }
            }
          }
        }
      }`;

      const issueDetailPromises = issueNums.map((issueNumber) => {
        const issue = graphql<{ repository: { issue: IssueGQL } }>(queryIssue, {
          owner: repoURL.owner,
          repo: repoURL.repo,
          issueNumber: issueNumber,
          headers: headers,
        });

        return issue;
      });

      const issueDetailsResponses = await Promise.all(issueDetailPromises);

      const issueArray = issueDetailsResponses.map((github) => {
        return github.repository.issue;
      });

      const issues = new Issues();
      issues.fromGitHubGraphQL(issueArray);
      return issues.toIssuesObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getRepoDetails = createAsyncThunk(
  'github/getRepoDetails',
  async (query: GitHubRepoQuery, thunkAPI) => {
    try {
      const repoResponse = await thunkAPI.dispatch(getRepo(query));

      if (getRepo.fulfilled.match(repoResponse) && repoResponse.payload) {
        const repo = new Repo(repoResponse.payload);

        const langResponse = await thunkAPI.dispatch(getRepoLanguages(query));

        if (
          getRepoLanguages.fulfilled.match(langResponse) &&
          langResponse.payload
        ) {
          repo.languagesFromGithub(langResponse.payload);
        }

        const contentsResponse = await thunkAPI.dispatch(
          getRepoContents(query)
        );

        if (
          getRepoContents.fulfilled.match(contentsResponse) &&
          contentsResponse.payload
        ) {
          repo.filterContents(contentsResponse.payload);
        }

        const contributorsResponse = await thunkAPI.dispatch(
          getContributors(query)
        );

        if (
          getContributors.fulfilled.match(contributorsResponse) &&
          contributorsResponse.payload
        ) {
          const contributors = new Contributors(contributorsResponse.payload);
          repo.setContributors(contributors);
        }

        if (repo.apiURL) {
          const issuesResponse = await thunkAPI.dispatch(
            getIssues(repo.apiURL)
          );

          if (getIssues.fulfilled.match(issuesResponse) && issuesResponse.payload) {
            const issues = new Issues(issuesResponse.payload)
            repo.setIssues(issues);
          }
        }

        return repo.toRepoObject();
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching repository details:', err);
      throw new Error(err.message);
    }
  }
);

// export const getRepos = createAsyncThunk('github/getRepos', async () => {
//   try {
//     const { data } = await octokit.request('/user/repos');

//     return data;
//   } catch (error) {
//     const err = error as Error;
//     console.error(err);
//     throw new Error(err.message);
//   }
// });

export type AuthenticatedUserRepoResponse =
  GetResponseDataTypeFromEndpointMethod<
    typeof octokit.rest.repos.listForAuthenticatedUser
  >;

export const getRepoDetailsList = createAsyncThunk(
  'github/getRepoDetailsList',
  async (_, thunkAPI) => {
    try {
      let repoDetailsList: Array<RepoObject> = [];

      const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser(
        {
          visibility: 'all',
          per_page: 100,
        }
      );

      if (Array.isArray(repos) && repos.length > 0) {
        for (const repo of repos) {
          const query = new GitHubRepoQuery(repo.owner.login, repo.name);
          const repoDetailsResponse = await thunkAPI.dispatch(
            getRepoDetails(query)
          );

          if (
            getRepoDetails.fulfilled.match(repoDetailsResponse) &&
            repoDetailsResponse.payload
          ) {
            repoDetailsList.push(repoDetailsResponse.payload);
          }
        }
        const repos1 = new Repos();
        repos1.fromGitHubAuthenticatedUser(repos);
        return repoDetailsList.map((repo) => new Repo(repo).toRepoObject());
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching repository details:', err);
      throw new Error(err.message);
    }
  }
);

export const getAuthenticatedAccount = createAsyncThunk(
  'github/getAuthenticatedAccount',
  async (_, thunkAPI) => {
    try {
      const query = `
        query {
          viewer {
            login
            name
            email
            id
            __typename
            avatarUrl
            bio
            url
            repositories(first: 20) {
              nodes {
                id
                name
                description
                url
                languages(first: 5) {
                  edges {
                    size
                    node {
                      name
                      color
                    }
                  }
                }
                owner {
                  id
                  __typename
                  login
                }
                issues(first: 10) {
                  nodes {
                    id
                    number
                    title
                    createdAt
                    state
                  }
                }
              }
            }
            organizations(first: 10) {
              nodes {
                id
                login
                name
                avatarUrl
                repositories(first: 25) {
                  nodes {
                    id
                    name
                    description
                    url
                    owner {
                      id
                      __typename
                      login
                    }
                    issues(first: 10) {
                      nodes {
                        id
                        number
                        title
                        createdAt
                        state
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const headers = getHeaders();

      const account: User | null = await graphql<UserGQLResponse>(query, {
        headers: headers,
      }).then((data) => {
        if (data.viewer.__typename === 'User') {
          const user = new User();
          user.fromGitHubGraphQL(data.viewer);
          return user;
        }

        return null;
      });

      const contactsResponse =
        account && account.login
          ? await thunkAPI.dispatch(getSocialAccounts(account.login))
          : null;

      if (
        account &&
        contactsResponse &&
        getSocialAccounts.fulfilled.match(contactsResponse) &&
        contactsResponse.payload
      ) {
        account.contactMethods = new ContactMethods();
        account.contactMethods.fromGitHub(contactsResponse.payload);
      }

      const contentsResponse =
        account && account.login
          ? await thunkAPI.dispatch(
              getRepoContents(new GitHubRepoQuery(account.login, account.login))
            )
          : null;

      if (
        account &&
        contentsResponse &&
        getRepoContents.fulfilled.match(contentsResponse) &&
        contentsResponse.payload
      ) {
        if (
          Array.isArray(contentsResponse.payload) &&
          contentsResponse.payload.length > 0
        ) {
          const contents = contentsResponse.payload;
          contents.forEach((content) => {
            if (content.type === 'file') {
              if (content.name === 'story.md') {
                account.setStory(content.download_url);
              }
            }
          });
        }
      }

      return account instanceof User ? account.toUserObject() : null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export type UserResponse = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.users.getByUsername
>;

export const getUserAccount = createAsyncThunk(
  'github/getUser',
  async (username: string, thunkAPI) => {
    try {
      const { data } = await octokit.users.getByUsername({ username });

      if (data) {
        const user = new User();
        user.fromGitHub(data);

        if (user.organizationsURL) {
          const orgResponse = await thunkAPI.dispatch(
            getOrganizationDetailsList(user.organizationsURL)
          );

          if (
            getOrganizationDetailsList.fulfilled.match(orgResponse) &&
            orgResponse.payload
          ) {
            user.setOrganizations(orgResponse.payload);
          }
        }

        const repoResponse = await thunkAPI.dispatch(getRepoDetailsList());

        if (
          getRepoDetailsList.fulfilled.match(repoResponse) &&
          repoResponse.payload
        ) {
          user.setRepos(repoResponse.payload);
        }

        const contactsResponse = user.id
          ? await thunkAPI.dispatch(getSocialAccounts(user.id))
          : null;

        if (
          contactsResponse &&
          getSocialAccounts.fulfilled.match(contactsResponse) &&
          contactsResponse.payload
        ) {
          user.contactMethods
            ? user.contactMethods
            : (user.contactMethods = new ContactMethods());
          user.contactMethods.fromGitHub(contactsResponse.payload);
          user.contactMethods.setContactWebsite({ url: user.website });
          user.contactMethods.setContactEmail({ value: user.email });
        }

        return user.toUserObject();
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

// export const getOrganizations = createAsyncThunk(
//   'github/getOrganizations',
//   async () => {
//     try {
//       const { data } = await octokit.request('/user/orgs');

//       return data as Array<Record<string, any>>;
//     } catch (error) {
//       const err = error as Error;
//       console.error(err);
//       throw new Error(err.message);
//     }
//   }
// );

export const getOrganizationAccount = createAsyncThunk(
  'github/getOrganization',
  async (organization: string) => {
    try {
      const query = `
        query ($login: String!) {
          organization(login: $login) {
            login
            name
            email
            id
            __typename
            avatarUrl
            url
            repositories(first: 30) {
              nodes {
                id
                name
                description
                url
                owner {
                  id
                  __typename
                  login
                }
                issues(first: 10) {
                  nodes {
                    id
                    number
                    title
                    createdAt
                    state
                  }
                }
              }
            }
          }
        }
      `;

      const headers = getHeaders();

      const org: Organization = await graphql<OrganizationResponseGQL>(query, {
        headers,
        login: organization,
      }).then((response) => {
        const org = new Organization();
        org.fromGitHubGraphQL(response.organization);
        return org;
      });

      return org.toOrganizationObject();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationDetails = createAsyncThunk(
  'github/getOrganizationsDetails',
  async (login: string, thunkAPI) => {
    try {
      const orgResponse = await thunkAPI.dispatch(
        getOrganizationAccount(login)
      );

      if (
        getOrganizationAccount.fulfilled.match(orgResponse) &&
        orgResponse.payload
      ) {
        const organization = new Organization(orgResponse.payload);
        return organization.toOrganizationObject();
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationDetailsList = createAsyncThunk(
  'github/getOrganizationsDetailsList',
  async (url: string, thunkAPI) => {
    try {
      let organizations: Array<OrganizationObject> = [];
      const headers = getHeaders();

      const organizationDetailsList = await fetch(url, {
        headers: headers,
      });

      const orgDetailsList = await organizationDetailsList.json();

      if (Array.isArray(orgDetailsList) && orgDetailsList.length > 0) {
        for (const organization of orgDetailsList) {
          const orgResponse = await thunkAPI.dispatch(
            getOrganizationDetails(organization.login)
          );

          if (
            getOrganizationDetails.fulfilled.match(orgResponse) &&
            orgResponse.payload
          ) {
            organizations.push(orgResponse.payload);
          }
        }

        return organizations;
      }

      return null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw new Error(err.message);
    }
  }
);

export const getOrganizationsRepos = createAsyncThunk(
  'github/getOrganizationsRepos',
  async (organization: string) => {
    try {
      const { data } = await octokit.request(`/orgs/${organization}/repos`);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }
);

const githubSliceOptions: CreateSliceOptions<GithubState> = {
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthenticatedAccount.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.userObject = action.payload;
      })
      // .addCase(getOrganizations.fulfilled, (state, action) => {
      //   state.githubLoading = false;
      //   state.githubErrorMessage = '';
      //   state.githubError = null;
      //   state.organizationsObject = action.payload;
      // })
      .addCase(getOrganizationDetailsList.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.organizationDetailsList = action.payload;
      })
      .addCase(getOrganizationAccount.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.organizationObject = action.payload;
      })
      // .addCase(getRepos.fulfilled, (state, action) => {
      //   state.githubLoading = false;
      //   state.githubErrorMessage = '';
      //   state.githubError = null;
      //   state.repos = action.payload;
      // })
      .addCase(getRepoDetailsList.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.repoDetailsList = action.payload;
      })
      .addCase(getRepo.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.repoObject = action.payload;
      })
      .addCase(getRepoContents.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.contents = action.payload ?? [];
      })
      .addCase(getRepoLanguages.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.githubStatusCode = 200;
        state.repoLanguages = action.payload;
      })
      .addCase(getSocialAccounts.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.socialAccounts = action.payload;
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage = '';
        state.githubError = null;
        state.issues = action.payload;
      })
      .addCase(getRepo.rejected, (state, action) => {
        state.githubLoading = false;
        state.githubErrorMessage =
          action.error && action.error.message
            ? action.error.message
            : 'An Error has occured.';
        state.githubError = action.error as Error;
      })
      .addMatcher(
        isAnyOf(
          getAuthenticatedAccount.pending,
          // getOrganizations.pending,
          // getRepos.pending,
          getRepo.pending,
          getRepoContents.pending,
          getRepoLanguages.pending,
          getRepoDetailsList.pending,
          getSocialAccounts.pending,
          getIssues.pending
        ),
        (state) => {
          state.githubLoading = true;
          state.githubErrorMessage = '';
          state.githubError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAuthenticatedAccount.rejected,
          getOrganizationAccount.rejected,
          // getOrganizations.rejected,
          // getRepos.rejected,
          getRepo.rejected,
          getRepoContents.rejected,
          getRepoLanguages.rejected,
          getRepoDetailsList.rejected,
          getSocialAccounts.rejected,
          getIssues.rejected
        ),
        (state, action) => {
          state.githubLoading = false;
          state.githubErrorMessage = action.error.message || '';
          state.githubError = action.error as Error;
        }
      );
  },
};

export const githubSlice = createSlice(githubSliceOptions);
