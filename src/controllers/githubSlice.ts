import type { CreateSliceOptions } from '@reduxjs/toolkit';
import {
  createSlice,
  createAsyncThunk,
  isAnyOf
} from '@reduxjs/toolkit';

import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';
import type {
  GetResponseDataTypeFromEndpointMethod,
  GetResponseTypeFromEndpointMethod,
} from '@octokit/types';
import { RequestError } from '@octokit/request-error';

import { getGitHubHeaders, getInstance } from '../services/github/Config';

import type {
  OrganizationObject,
  OrganizationResponseGQL,
  UserObject,
  IssueGQL,
  IssuesObject,
  ContributorsObject,
  AccountGQLResponse,
  RepoObject,
  GitHubRepoFileResponse,
  GitHubUser,
} from '@the7ofdiamonds/ui-ux';
import {
  RepoContent,
  GitHubRepoQuery,
  RepoContentQuery,
  Organization,
  Repo,
  User,
  Repos,
  ContactMethods,
  RepoAPIURL,
  Issues,
  Contributors,
  Skills,
  ProjectSkills,
  Commits
} from '@the7ofdiamonds/ui-ux';

type OctokitResponse<T = any, S = number> = {
  data: T;
  status: S;
};

export interface GithubState {
  githubLoading: boolean;
  githubLoadingMessage: string | null;
  githubStatusCode: number;
  githubError: Error | null;
  githubErrorMessage: string | null;
  socialAccounts: SocialAccounts | null;
  userObject: UserObject | null;
  organizationObject: OrganizationObject | null;
  organizationReposObject: Array<RepoObject> | null;
  organizationsObject: Array<OrganizationObject> | null;
  organizationDetailsList: Array<Record<string, any>> | null;
  contents: Array<Record<string, any>> | null;

  repos: Array<RepoObject> | null;
  repoDetailsList: Array<Record<string, any>> | null;
  repoObject: RepoObject | null;
  repoLanguages: Array<Record<string, any>> | null;
  file: string | null;
  issues: IssuesObject | null;
  contributorsObject: ContributorsObject | null;
  organizationProjects: Array<Record<string, any>> | null;
}

const initialState: GithubState = {
  githubLoading: false,
  githubLoadingMessage: null,
  githubStatusCode: 0,
  githubError: null,
  githubErrorMessage: '',
  userObject: null,
  organizationObject: null,
  organizationReposObject: null,
  organizationsObject: null,
  organizationDetailsList: null,
  repos: null,
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

const octokit: Octokit = new Octokit();

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
      if (!query.owner || !query.repo) {
        throw new Error('Missing owner or repo name.');
      }

      const octokit = getInstance();

      if (!octokit) {
        console.error('Failed to initialize Octokit instance.');
        return null;
      }

      const repoResponse: RepoResponse = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: query.owner,
        repo: query.repo,
        headers: {
          'X-GitHub-Api-Version': '2026-03-10'
        }
      })

      if (repoResponse.status === 200) {
        const githubRepo: GitHubRepo = repoResponse.data;
        const repo = new Repo();
        repo.fromGitHub(githubRepo);
        return repo.toRepoObject();
      }

      return null;
    } catch (error: Error | RequestError) {
      if (error instanceof RequestError && error.status === 404) {
        return rejectWithValue('Project could not be found or does not exist.');
      }

      return rejectWithValue(error.message || 'An unknown error occurred.');
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

      const { data }: RepoContentsResponse =
        await octokit.rest.repos.getContent({
          owner: query.owner,
          repo: query.repo,
          path: '',
        });

      let contents: Array<Record<string, any>> = [];

      if (Array.isArray(data) && data.length > 0) {
        data.forEach((content) => {
          contents.push(new RepoContent(content).toRepoContentObject());
        });
      }

      return contents;
    } catch (error) {
      if (
        error instanceof RequestError &&
        error.status === 404 &&
        error.message.includes('empty')
      ) {
        return null;
      }

      const err = error as Error;
      console.error('Failed to fetch repo contents:', err);
      return null;
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

export type CommitsResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.listCommits
>;

export const getCommits = createAsyncThunk<CommitsResponse[], { owner: string; repo: string }>(
  'github/getCommits',
  async ({ owner, repo }: { owner: string; repo: string }) => {
    const octokit = getInstance();

    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner,
        repo,
      });

      return response.data;
    } catch (error: any) {
      console.error('Error fetching commits:', error);
      throw new Error(error.message || 'Failed to fetch commits');
    }
  }
);

type RepoFileResponse = GetResponseTypeFromEndpointMethod<
  typeof octokit.rest.repos.getContent
>;

export type GitHubRepoFile = RepoFileResponse['data'];

export const getRepoFile = createAsyncThunk<string | null, RepoContentQuery>(
  'github/getRepoFile',
  async (query: RepoContentQuery) => {
    const { owner, repo, path, branch } = query;

    try {
      const octokit = getInstance();

      const response: OctokitResponse<any> = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });

      if ((owner === null || owner.trim() === "") || (repo === null || repo.trim() === "") || (path === null || path.trim() === "")) {
        return null;
      }

      if (response.data.type === 'file') {
        return atob(response.data.content);
      }

      console.warn(`Content at ${path} is not a file. Type: ${response.data.type}`);
      return null;
    } catch (error: any) {
      if (error.status === 404) {
        console.warn(`File not found: ${owner}/${repo}/${path} (branch: ${branch})`);
        return null;
      }
      console.error('GitHub API error:', error);
      throw new Error(error.message || 'Unknown error fetching GitHub content');
    }
  }
);

type IssuesGQL = {
  repository: {
    issues: {
      nodes: Array<IssueGQL>;
    };
  };
};

export const getIssues = createAsyncThunk(
  'github/getIssues',
  async (query: GitHubRepoQuery) => {
    try {

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

      const headers = getGitHubHeaders();

      const issuesGQL = await graphql<IssuesGQL>(queryIssues, {
        owner: query.owner,
        repo: query.repo,
        ...headers,
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
          owner: query.owner,
          repo: query.repo,
          issueNumber: issueNumber,
          ...headers,
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

export const getRepoDetails = createAsyncThunk<RepoObject | null, GitHubRepoQuery>(
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
          const skills = new ProjectSkills();
          skills.languagesFromGithub(langResponse.payload);
          repo.setSkills(skills);
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

        const getCommitsResponse = await thunkAPI.dispatch(
          getCommits(query)
        );

        if (getCommitsResponse.payload) {
          const commits = new Commits();
          commits.fromResponse(getCommitsResponse.payload)
          repo.setCommits(commits)
        }

        const issuesResponse = await thunkAPI.dispatch(
          getIssues(query)
        );

        if (
          getIssues.fulfilled.match(issuesResponse) &&
          issuesResponse.payload
        ) {
          const issues = new Issues(issuesResponse.payload);
          repo.setIssues(issues);
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

export const getRepos = createAsyncThunk('github/getRepos', async () => {
  try {
    const octokit = getInstance();

    if (!octokit) {
      console.error('Failed to initialize Octokit instance.');
      return null;
    }

    const { data } = await octokit.request('/user/repos');

    return data;
  } catch (error: Error | RequestError) {
    const err = error as Error;
    console.error(err);
    throw new Error(err.message);
  }
});

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
      const headers = getGitHubHeaders();

      if (!headers) {
        console.error('Headers are not present in the instance.');
        return null;
      }

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
            repositories(first: 100) {
              nodes {
                id
                name
                description
                url
                isPrivate
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
            organizations(first: 25) {
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
                    isPrivate
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

      //       const account: User | null = await graphql<AccountGQLResponse>(query, {
      //         headers: headers,
      //       }).then((data) => {
      // console.log('GraphQL response for authenticated account:', data);
      //         if (data.viewer.__typename === 'User') {
      //           const user = new User();
      //           user.fromGitHubGraphQL(data.viewer);
      //           return user;
      //         }

      //         return null;
      //       }).catch((error) => {
      //         console.error('Error fetching authenticated account:', error.message);
      //         return null;
      //       });

      const account: User | null = await fetch("https://api.github.com/graphql", {
        method: "POST",
        ...headers,
        body: JSON.stringify({ query: query }),
      }).then((res) => {
        const json = res.json()
          .then((json) => {
            if (json.errors) {
              const errorMessages = json.errors.map((error: any) => error.message).join(", ");
              throw new Error(errorMessages);
            }

            if (!json.data) {
              throw new Error('No data field in GraphQL response');
            }

            const jsonData = json.data as AccountGQLResponse;

            if (jsonData?.viewer?.__typename === 'User') {
              const user = new User();
              user.fromGitHubGraphQL(jsonData.viewer);
              return user;
            }

            return null;
          }).catch((error) => {
            console.error('Error parsing JSON response:', error);
            return null;
          });
        return json;
      }).catch((error) => {
        console.error('Error fetching authenticated account:', error.message);
        return null;
      });

      const contactsResponse =
        account && account.username
          ? await thunkAPI.dispatch(getSocialAccounts(account.username))
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

      return account instanceof User ? account.toUserObject() : null;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      return null;
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
        user.fromGitHub(data as GitHubUser);

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
          user.setRepos(new Repos(repoResponse.payload));
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

          if (user.website) {
            user.contactMethods.setContactWebsite(user.website);
          }

          if (user.email) {
            user.contactMethods.setContactEmail(user.email);
          }
        }

        return user.toUserObject();
      }

      return null;
    } catch (error: Error | RequestError) {
      console.error(error.message);
      return null;
    }
  }
);

export const getOrganizationAccount = createAsyncThunk(
  'github/getOrganization',
  async (organization: string) => {
    try {
      const query = `
        query ($login: String!) {
          organization(login: $login) {
            id
            __typename
                name
    login
    description
    websiteUrl
    url
    email
    location
    twitterUsername
    avatarUrl
    isVerified
    membersWithRole(first: 10) {
      totalCount
      nodes {
        login
        name
        email
        avatarUrl
      }
    }
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

      const headers = getGitHubHeaders();

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
      const headers = getGitHubHeaders();

      const organizationDetailsList = await fetch(url, {
        ...headers,
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
      .addCase(getAuthenticatedAccount.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage = 'Now Loading User Data from GitHub';
        state.githubErrorMessage = null;
        state.githubError = null;
      })
      .addCase(getOrganizationAccount.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage =
          'Now Loading Organization Data from GitHub';
        state.githubErrorMessage = null;
        state.githubError = null;
      })
      .addCase(getOrganizationDetailsList.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage =
          'Now Loading Organization Data from GitHub';
        state.githubErrorMessage = null;
        state.githubError = null;
      })
      .addCase(getIssues.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage = 'Now Loading Issues from GitHub Repo';
        state.githubErrorMessage = null;
        state.githubError = null;
      })
      .addCase(getRepo.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage = 'Now Loading Repo from GitHub';
        state.githubErrorMessage = null;
        state.githubError = null;
      })
      .addCase(getRepoContents.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage = 'Now Loading Contents from GitHub Repo';
        state.githubErrorMessage = '';
        state.githubError = null;
      })
      .addCase(getRepoLanguages.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage = 'Now Loading Languages from GitHub Repo';
        state.githubErrorMessage = null;
        state.githubError = null;
      })
      .addCase(getRepoDetailsList.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage = 'Now Loading GitHub Repo Details';
        state.githubErrorMessage = null;
        state.githubError = null;
      })
      .addCase(getRepos.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage = 'Now Loading GitHub Repos';
        state.githubErrorMessage = '';
        state.githubError = null;
      })
      .addCase(getSocialAccounts.pending, (state, action) => {
        state.githubLoading = true;
        state.githubLoadingMessage =
          'Now Loading User Social Accounts from GitHub';
        state.githubErrorMessage = null;
        state.githubError = null;
      })
      .addCase(getAuthenticatedAccount.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.userObject = action.payload;
      })
      .addCase(getOrganizationDetailsList.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.organizationDetailsList = action.payload;
      })
      .addCase(getOrganizationAccount.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.organizationObject = action.payload;
      })
      .addCase(getRepos.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.repos = action.payload;
      })
      .addCase(getRepoDetailsList.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.repoDetailsList = action.payload;
      })
      .addCase(getRepo.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.repoObject = action.payload;
      })
      .addCase(getRepoContents.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.contents = action.payload;
      })
      .addCase(getRepoLanguages.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.githubStatusCode = 200;
        state.repoLanguages = action.payload;
      })
      .addCase(getSocialAccounts.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.socialAccounts = action.payload;
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage = null;
        state.githubError = null;
        state.issues = action.payload;
      })
      .addCase(getRepo.rejected, (state, action) => {
        state.githubLoading = false;
        state.githubLoadingMessage = null;
        state.githubErrorMessage =
          action.error && action.error.message
            ? action.error.message
            : 'An Error has occured.';
        state.githubError = action.error as Error;
      })
      .addMatcher(
        isAnyOf(
          getAuthenticatedAccount.rejected,
          getIssues.rejected,
          getOrganizationAccount.rejected,
          getRepo.rejected,
          getRepoContents.rejected,
          getRepoLanguages.rejected,
          getRepoDetailsList.rejected,
          getRepos.rejected,
          getSocialAccounts.rejected
        ),
        (state, action) => {
          state.githubLoading = false;
          state.githubLoadingMessage = null;
          state.githubErrorMessage = action.error.message || '';
          state.githubError = action.error as Error;
        }
      );
  },
};

export const githubSlice = createSlice(githubSliceOptions);
