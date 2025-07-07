import {
  Account as AccountCommunications,
  AccountObject as AccountObjectCommunications,
  ContactMethods,
  ContactMethodsObject,
  SkillsObject,
} from '@the7ofdiamonds/communications';

import {  } from '@/controllers/githubSlice';
import {
  GitHubRepoQuery,
  GitHubRepoQueryObject,
} from '@/model/GitHubRepoQuery';
import { OrganizationGQL, OrganizationObject } from '@/model/Organization';
import { Portfolio, PortfolioObject } from '@/model/Portfolio';
import { Repo, RepoObject, RepositoryGQL } from '@/model/Repo';
import { Repos } from '@/model/Repos';
import { Skills } from '@/model/Skills';
import { Organizations } from './Organizations';

export type AccountGQL = {
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

export type AccountGQLResponse = {
  viewer: AccountGQL;
};

export type AccountObject = AccountObjectCommunications & {
  organizations_url: string | null;
  organizations: Array<OrganizationObject> | null;
  repos_url: string | null;
  repos: Array<RepoObject> | null;
  repo_queries: Array<GitHubRepoQueryObject> | null;
  skills: SkillsObject | null;
  portfolio: PortfolioObject | null;
};

export interface iAccount {
  organizationsURL: string | null;
  organizations: Organizations | null;
  reposURL: string | null;
  repos: Repos | null;
  repoQueries: Array<GitHubRepoQuery>;
  skills: Skills;
  portfolio: Portfolio | null;
  fromGitHubGraphQL: (data: any) => void;
  fromGitHub: (data: any) => void;
  fromDB: (data: Record<string, any>) => void;
  fromJson: (data: Record<string, any>) => void;
  setReposURL: (url: string) => void;
  setRepos: (repos: Repos) => void;
  getRepoQueries: (data: Array<Record<string, any>>) => Array<GitHubRepoQuery>;
  setRepoQueries: (repos: Array<RepoObject>) => void;
  setPortfolio: (portfolio: Portfolio) => void;
  setSkills: (skills: Skills) => void;
}

export class Account extends AccountCommunications implements iAccount {
  organizationsURL: string | null;
  organizations: Organizations | null;
  reposURL: string | null;
  repos: Repos | null;
  repoQueries: Array<GitHubRepoQuery>;
  skills: Skills;
  portfolio: Portfolio | null;

  constructor(data?: AccountObject | Partial<AccountObject>) {
    super(data);
    
    this.organizationsURL = data?.organizations_url
      ? data.organizations_url
      : null;
    this.organizations = data?.organizations
      ? new Organizations(data.organizations)
      : null;
    this.reposURL = data?.repos_url ? data.repos_url : null;
    this.repos = data?.repos ? new Repos(data.repos) : null;
    this.repoQueries = data?.repo_queries
      ? data.repo_queries.map(
          (repoQuery) => new GitHubRepoQuery(repoQuery.owner, repoQuery.repo)
        )
      : [];
    this.portfolio = data?.portfolio ? new Portfolio(data.portfolio) : null;
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
  }

  fromGitHubGraphQL(user: AccountGQL) {
    this.id = user.id;
    this.avatarURL = user.avatarUrl;
    this.name = user.name;
    // this.bio = user.bio;
    this.email = user.email;
    this.login = user.login;

    if (
      Array.isArray(user.organizations.nodes) &&
      user.organizations.nodes.length > 0
    ) {
      const orgs = new Organizations();
      orgs.fromGitHubGraphQL(user.organizations);
      this.organizations = orgs;
    }

    if (
      Array.isArray(user.repositories.nodes) &&
      user.repositories.nodes.length > 0
    ) {
      const repos = new Repos();
      const orgRepos =
        this.organizations && this.organizations.list
          ? this.organizations.list.flatMap((org) =>
              org.repos &&
              org.repos?.collection &&
              Array.isArray(org.repos?.collection)
                ? org.repos.collection
                : []
            )
          : [];
      repos.fromGitHubGraphQL(user.repositories.nodes);
      const totalRepos: Array<Repo> = [...orgRepos, ...repos.collection];
      repos.setCollection(totalRepos);
      this.repos = repos;
    }

    if (this.repos && this.repos.collection.length > 0) {
      const portfolio = new Portfolio();
      portfolio.fromRepos(this.repos);
      this.portfolio = portfolio;
    }
  }

  fromGitHub(data: any) {
    this.id = data?.login;
    this.avatarURL = data?.avatar_url;
    this.name = data?.name;
    // this.bio = data?.bio;
    this.email = data?.email;
    // this.website = data?.blog;
    this.organizationsURL = data?.organizations_url;
    this.reposURL = data?.repos_url;
    this.login = data?.login;

    if (data?.html_url || data?.email) {
      this.contactMethods = new ContactMethods();

      if (data?.html_url) {
        this.contactMethods.setContactGitHub(data.html_url);
      }

      if (data?.email) {
        this.contactMethods.setContactEmail(data.email);
      }
    }
  }

  fromDB(data: Record<string, any>) {
    // this.title = data?.title || this.title;

    // try {
    //   const resume = data?.resume ? new URL(data?.resume) : null;
    //   this.resume = resume ? resume.href : this.resume;
    // } catch (error) {
    //   console.error(`Invalid URL: ${data?.resume}`, error);
    // }
  }

  fromJson(json: Record<string, any>) {
    this.id = '0';
    this.login = json.contact_methods.login || null;
    this.avatarURL = json.avatar_url || null;
    this.name = json.name || null;
    this.email = json.contact_methods.email.value || null;
    // this.phone = json.contact_methods.phone.value || null;
    // this.website = json.website || null;
    this.contactMethods = json.contact_methods
      ? new ContactMethods(json.contact_methods)
      : null;
  }

  setOrganizationsURL(url: string) {
    this.organizationsURL = url;
  }

  setOrganizations(organizations: Array<OrganizationObject>) {
    this.organizations = new Organizations(organizations);
  }

  setReposURL(url: string) {
    this.reposURL = url;
  }

  setRepos(repos: Repos) {
    this.repos = repos;
  }

  getRepos(data: Array<RepoObject>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => repo.toObject());
  }

  getRepoQueries(data: Array<Record<string, any>>): Array<GitHubRepoQuery> {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((query) => {
        repoQueries.push(new GitHubRepoQuery(query.owner?.login, query.id));
      });
    }

    return repoQueries;
  }

  setRepoQueries(repos: Array<RepoObject>) {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (repos.length > 0) {
      repos.forEach((repo) => {
        const repoQuery =
          repo?.owner?.login && repo?.id
            ? new GitHubRepoQuery(repo?.owner?.login, repo?.id)
            : null;

        if (repoQuery) {
          repoQueries.push(repoQuery);
        }
      });
    }

    this.repoQueries = repoQueries;
  }

  setPortfolio(portfolio: Portfolio) {
    this.portfolio = portfolio;
  }

  setSkills(skills: Skills) {
    this.skills = skills;
  }
}
