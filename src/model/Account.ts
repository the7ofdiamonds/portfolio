import { ContactMethods, ContactMethodsObject } from './ContactMethods';
import { GitHubRepoQuery, GitHubRepoQueryObject } from './GitHubRepoQuery';
import { OrganizationGQL, OrganizationObject } from './Organization';
import { Portfolio, PortfolioObject } from './Portfolio';
import { RepoObject, RepositoryGQL } from './Repo';
import { Repos } from './Repos';
import { Skills, SkillsObject } from './Skills';

export type AccountGQLResponse = {
  viewer: {
    id: string;
    __typename: string;
    login: string;
    name: string;
    email: string;
    bio: string;
    avatarUrl: string;
    organizations: {
      nodes: Array<OrganizationGQL>;
    };
    repositories: {
      nodes: Array<RepositoryGQL>;
    };
  };
};

export type AccountObject = {
  id: string | null;
  created_at: string | null;
  updated_at: string | null;
  login: string | null;
  avatar_url: string | null;
  name: string | null;
  email: string | null;
  contact_methods: ContactMethodsObject | null;
  repos_url: string | null;
  repos: Array<RepoObject> | null;
  repo_queries: Array<GitHubRepoQueryObject> | null;
  url: string | null;
  location: string | null;
  skills: SkillsObject | null;
  portfolio: PortfolioObject | null;
};

export class Account {
  id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  login: string | null;
  avatarURL: string | null;
  name: string | null;
  email: string | null;
  contactMethods: ContactMethods | null;
  reposURL: string | null;
  repos: Repos | null;
  public repoQueries: Array<GitHubRepoQuery>;
  url: string | null;
  location: string | null;
  skills: Skills;
  portfolio: Portfolio | null;

  constructor(data?: AccountObject | Partial<OrganizationObject>) {
    this.id = data?.id ? data.id : null;
    this.createdAt = data?.created_at ? data.created_at : null;
    this.updatedAt = data?.updated_at ? data.updated_at : null;
    this.login = data?.login ? data.login : null;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
    this.name = data?.name ? data.name : null;
    this.location = data?.location ? data.location : null;
    this.email = data?.email ? data.email : null;
    this.url = data?.url ? data.url : null;
    this.contactMethods = data?.contact_methods
      ? new ContactMethods(data?.contact_methods)
      : null;
    this.contactMethods
      ? this.contactMethods.setContactEmail({ value: this.email })
      : null;
    this.reposURL = data?.repos_url ? data.repos_url : null;
    this.repos = data?.repos ? new Repos(data.repos) : null;
    this.repoQueries = data?.repo_queries
      ? data.repo_queries.map(
          (repoQuery) => new GitHubRepoQuery(repoQuery.owner, repoQuery.repo)
        )
      : [];
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
    this.portfolio = data?.repos
      ? this.getPortfolioFromRepos(data.repos)
      : null;
  }

  getPortfolioFromRepos(reposObject: Array<RepoObject>) {
    const repos = new Repos(reposObject);
    const portfolio = new Portfolio();
    portfolio.fromRepos(repos);
    return portfolio;
  }

  setSkills(skills: Skills) {
    this.skills = skills;
  }
}
