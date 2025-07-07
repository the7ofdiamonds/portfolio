import {
  ContactMethodsObject,
  SkillsObject,
  User as UserCommunications,
  UserObject as UserObjectCommunications,
} from '@the7ofdiamonds/communications';

import { ContactMethods } from '@/model/ContactMethods';
import { Organizations, OrganizationsGQL } from '@/model/Organizations';
import { Repos } from '@/model/Repos';
import {
  GitHubRepoQuery,
  GitHubRepoQueryObject,
} from '@/model/GitHubRepoQuery';
import { Repo, RepoObject, RepositoryGQL } from '@/model/Repo';
import { OrganizationObject } from './Organization';
import { Portfolio, PortfolioObject } from '@/model/Portfolio';

import { UserResponse } from '@/controllers/githubSlice';
import { Skills } from './Skills';
import { Account, AccountObject, iAccount } from './Account';
import { RepoURL } from './RepoURL';

export type UserGQL = {
  id: string;
  __typename: string;
  login: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  organizations: {
    nodes: OrganizationsGQL;
  };
  repositories: {
    nodes: Array<RepositoryGQL>;
  };
};

export type UserGQLResponse = {
  viewer: UserGQL;
};

export type UserObject = Omit<UserObjectCommunications, 'type'> & AccountObject;

export class User extends UserCommunications implements iAccount {
  organizationsURL: string | null;
  organizations: Organizations | null;
  reposURL: string | null;
  repos: Repos | null;
  repoQueries: Array<GitHubRepoQuery>;
  portfolio: Portfolio | null;
  skills: Skills;

  constructor(data?: UserObject | Partial<UserObject>) {
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
      ? this.getRepoQueries(data.repo_queries)
      : [];
    this.portfolio = data?.portfolio ? new Portfolio(data.portfolio) : null;
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
  }

  fromGitHubGraphQL(user: UserGQL) {
    this.id = user.id;
    this.avatarURL = user.avatarUrl;
    this.name = user.name;
    this.bio = user.bio;
    this.email = user.email;
    this.login = user.login;

    if (
      Array.isArray(user.organizations.nodes) &&
      user.organizations.nodes.length > 0
    ) {
      const orgs = new Organizations();
      orgs.fromGitHubGraphQL(user.organizations.nodes);
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

  fromGitHub(data: UserResponse) {
    this.id = data?.login;
    this.avatarURL = data?.avatar_url;
    this.name = data?.name;
    this.bio = data?.bio;
    this.email = data?.email;
    this.website = data?.blog;
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
    this.title = data?.title || this.title;

    try {
      const resume = data?.resume ? new URL(data?.resume) : null;
      this.resume = resume ? resume.href : this.resume;
    } catch (error) {
      console.error(`Invalid URL: ${data?.resume}`, error);
    }
  }

  fromJson(json: Record<string, any>) {
    this.id = '0';
    this.login = json.contact_methods.login || null;
    this.avatarURL = json.avatar_url || null;
    this.name = json.name || null;
    this.title = json.title || null;
    this.email = json.contact_methods.email.value || null;
    this.phone = json.contact_methods.phone.value || null;
    this.resume = json.resume || null;
    this.website = json.website || null;
    this.contactMethods = json.contact_methods
      ? new ContactMethods(json.contact_methods)
      : null;
  }

  setOrganizationsURL() {}

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

  toUserObject(): UserObject {
    return {
      id: this.id,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      login: this.login,
      avatar_url: this.avatarURL,
      name: this.name,
      title: this.title,
      location: this.location,
      bio: this.bio,
      email: this.email,
      phone: this.phone,
      resume: this.resume,
      website: this.website,
      story: this.story ? this.story : null,
      url: this.url,
      contact_methods: this.contactMethods
        ? this.contactMethods.toContactMethodsObject()
        : null,
      organizations_url: this.organizationsURL,
      organizations:
        this.organizations && this.organizations.list.length > 0
          ? this.organizations.list.map((org) => org.toOrganizationObject())
          : null,
      repos_url: this.reposURL,
      repos:
        this.repos && this.repos.collection.length > 0
          ? this.repos.collection.map((repo) => repo.toRepoObject())
          : null,
      repo_queries:
        this.repoQueries && this.repoQueries.length > 0
          ? this.repoQueries
              .filter((repoQuery) => repoQuery.owner && repoQuery.repo)
              .map((repoQuery) => repoQuery.toGitHubRepoQueryObject())
          : null,
      portfolio: this.portfolio ? this.portfolio.toPortfolioObject() : null,
      skills: this.skills ? this.skills.toSkillsObject() : null,
    };
  }
}
