import { ContactMethods, ContactMethodsObject } from './ContactMethods';
import { Repos } from './Repos';

import { GitHubRepoQuery, GitHubRepoQueryObject } from './GitHubRepoQuery';
import { RepoObject, RepositoryGQL } from './Repo';
import { Account, AccountObject } from './Account';
import { Portfolio, PortfolioObject } from './Portfolio';
import { Skills } from './Skills';

// import { OrganizationAccountResponse } from '@/controllers/githubSlice';

export type OrganizationGQL = {
  id: string;
  login: string;
  name: string;
  avatarUrl: string;
  repositories: {
    nodes: Array<RepositoryGQL>;
  };
};

export type OrganizationResponseGQL = {
  organization: OrganizationGQL;
};

export interface OrganizationObject extends AccountObject {
  id: string | null;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string | null;
  login: string | null;
  description: string | null;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  url: string | null;
  contact_methods: ContactMethodsObject | null;
  repos_url: string | null;
  repos: Array<RepoObject> | null;
  repo_queries: Array<GitHubRepoQueryObject> | null;
  portfolio: PortfolioObject | null;
}

export class Organization extends Account {
  type: string = 'Organization';
  company: string | null;
  description: string | null;
  blog: string | null;

  constructor(data?: OrganizationObject | Partial<OrganizationObject>) {
    super(data);

    this.id = data?.id ? data.id : null;
    this.createdAt = data?.created_at ? data?.created_at : null;
    this.updatedAt = data?.updated_at ? data.updated_at : null;
    this.login = data?.login ? data.login : null;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
    this.description = data?.description ? data.description : null;
    this.name = data?.name ? data.name : null;
    this.company = data?.company ? data.company : null;
    this.blog = data?.blog ? data.blog : null;
    this.location = data?.location ? data.location : null;
    this.email = data?.email ? data.email : null;
    this.url = data?.url ? data?.url : null;

    if (data?.contact_methods || this.email || this.blog) {
      this.contactMethods = new ContactMethods();

      if (data?.contact_methods) {
        this.contactMethods = new ContactMethods(data.contact_methods);
      }

      if (this.email) {
        this.contactMethods.setContactEmail(this.email);
      }

      if (this.blog) {
        this.contactMethods.setContactWebsite(this.blog);
      }
    }

    this.reposURL = data?.repos_url ? data?.repos_url : null;
    this.repos = data?.repos ? new Repos(data.repos) : null;
    this.repoQueries = data?.repo_queries
      ? this.setRepoQueries(data?.repo_queries)
      : [];
    this.portfolio = data?.portfolio ? new Portfolio(data.portfolio) : null;
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
  }

  fromGitHubGraphQL(response: OrganizationGQL) {
    const org = response ? response : null;

    if (!org) {
      return;
    }

    this.id = org.id;
    this.login = org.login;
    this.name = org.name;
    this.avatarURL = org.avatarUrl;

    if (
      Array.isArray(org.repositories.nodes) &&
      org.repositories.nodes.length > 0
    ) {
      const repos = new Repos();
      repos.fromGitHubGraphQL(org.repositories.nodes);
      this.repos = repos;
    }

    if (this.repos && this.repos.count > 0) {
      const portfolio = new Portfolio();
      portfolio.fromRepos(this.repos);
      this.portfolio = portfolio;
    }
  }

  getRepos(data: Array<RepoObject>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => {
      return {
        ...repo.toObject(),
        skills: repo.skills ? repo.skills.toSkillsObject() : null,
        contents: {
          solution:
            repo.contents && repo.contents.solution
              ? repo.contents.solution.toObject()
              : null,
          design:
            repo.contents && repo.contents.design
              ? repo.contents.design?.toObject()
              : null,
          development:
            repo.contents && repo.contents.development
              ? repo.contents.development.toObject()
              : null,
          delivery:
            repo.contents && repo.contents.delivery
              ? repo.contents.delivery.toObject()
              : null,
          problem:
            repo.contents && repo.contents.problem
              ? repo.contents.problem.toObject()
              : null,
        },
        contributors: {
          users:
            repo.contributors &&
            Array.isArray(repo.contributors.list) &&
            repo.contributors.list.length > 0
              ? repo.contributors.list.map((user) => user.toContributorObject())
              : null,
        },
      };
    });
  }

  setReposFromGitHub(data: Array<RepoObject>) {
    const repos = new Repos();
    repos.fromGitHub(data);
    this.repos = repos;
  }

  getReposFromGitHub(data: Array<RepoObject>) {
    const repos = new Repos();
    repos.fromGitHub(data);
    return repos.collection.map((repo) => {
      return {
        ...repo.toObject(),
        skills: repo.skills ? repo.skills.toSkillsObject() : null,
        contents: {
          solution:
            repo.contents && repo.contents.solution
              ? repo.contents.solution.toObject()
              : null,
          design:
            repo.contents && repo.contents.design
              ? repo.contents.design.toObject()
              : null,
          development:
            repo.contents && repo.contents.development
              ? repo.contents.development.toObject()
              : null,
          delivery:
            repo.contents && repo.contents.delivery
              ? repo.contents.delivery.toObject()
              : null,
          problem:
            repo.contents && repo.contents.problem
              ? repo.contents.problem.toObject()
              : null,
        },
        contributors: {
          users:
            repo.contributors &&
            Array.isArray(repo.contributors.list) &&
            repo.contributors.list.length > 0
              ? repo.contributors.list.map((user) => user.toContributorObject())
              : null,
        },
      };
    });
  }

  // fromGitHub(data: OrganizationAccountResponse) {
  //   this.id = data?.login ? data?.login : this.id;
  //   this.createdAt = data?.created_at ? data?.created_at : this.createdAt;
  //   this.updatedAt = data?.updated_at ? data?.updated_at : this.updatedAt;
  //   this.login = data?.login ? data?.login : this.login;
  //   this.avatarURL = data?.avatar_url ? data?.avatar_url : this.avatarURL;
  //   this.name = data?.name ? data?.name : this.name;
  //   this.company = data?.company ? data?.company : this.company;
  //   this.description = data?.description ? data?.description : this.description;
  //   this.email = data?.email ? data?.email : this.email;
  //   this.blog = data?.blog ? data?.blog : this.blog;
  //   this.location = data?.location ? data?.location : this.location;
  //   this.reposURL = data?.repos_url ? data?.repos_url : this.reposURL;
  //   this.url = data?.url ? data?.url : this.url;

  //   data?.html_url && this.contactMethods
  //     ? this.contactMethods.setContactGitHub({ url: data?.html_url })
  //     : (this.contactMethods = new ContactMethods());

  //   data?.html_url
  //     ? this.contactMethods.setContactGitHub({ url: data?.html_url })
  //     : null;
  // }

  fromDB(data: Record<string, any>) {
    this.company = data?.company ? data?.company : this.company;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : this.avatarURL;
  }

  getRepoQueries(data: Array<Record<string, any>>) {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((query) => {
        const repoQuery = new GitHubRepoQuery(query.owner.login, query.id);
        repoQueries.push(repoQuery);
      });
    }

    return repoQueries;
  }

  setRepoQueries(data: Array<Record<string, any>>) {
    let repoQueries: Array<GitHubRepoQuery> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((query) => {
        const repoQuery = new GitHubRepoQuery(query.owner, query.repo);
        repoQueries.push(repoQuery);
      });
    }

    return repoQueries;
  }

  toOrganizationObject(): OrganizationObject {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      avatar_url: this.avatarURL,
      login: this.login,
      description: this.description,
      name: this.name,
      company: this.company,
      blog: this.blog,
      location: this.location,
      email: this.email,
      url: this.url,
      contact_methods: this.contactMethods
        ? this.contactMethods.toContactMethodsObject()
        : null,
      repos_url: this.reposURL,
      repos: this.repos
        ? this.repos.collection.map((repo) => repo.toRepoObject())
        : null,
      repo_queries: this.repoQueries
        ? this.repoQueries.map((repoQuery) =>
            repoQuery.toGitHubRepoQueryObject()
          )
        : null,
      portfolio: this.portfolio ? this.portfolio.toPortfolioObject() : null,
      skills: this.skills ? this.skills.toSkillsObject() : null,
    };
  }
}
