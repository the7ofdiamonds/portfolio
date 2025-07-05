import { Account, AccountObject } from './Account';
import { ContactMethods } from '@/model/ContactMethods';
import { Organizations, OrganizationsGQL } from '@/model/Organizations';
import { Repos } from '@/model/Repos';
import { GitHubRepoQuery } from '@/model/GitHubRepoQuery';
import { Repo, RepoObject, RepositoryGQL } from '@/model/Repo';
import { OrganizationObject } from './Organization';
import { ContentURL } from '@/model/ContentURL';
import { Portfolio } from '@/model/Portfolio';

import { UserResponse } from '@/controllers/githubSlice';

export interface UserObject extends AccountObject {
  title: string | null;
  bio: string | null;
  website: string | null;
  story: string | null;
  phone: string | null;
  resume: string | null;
  organizations_url: string | null;
  organizations: Array<OrganizationObject> | null;
}

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

export class User extends Account {
  type: string = 'User';
  title: string | null;
  bio: string | null;
  website: string | null;
  story: ContentURL | null;
  phone: string | null;
  resume: string | null;
  organizationsURL: string | null;
  organizations: Organizations | null;

  constructor(data?: UserObject | Partial<UserObject>) {
    super(data);

    this.id = data?.id ? data.id : this.getID();
    this.login = data?.login ? data?.login : null;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
    this.name = data?.name ? data.name : null;
    this.title = data?.title ? data.title : null;
    this.bio = data?.bio ? data.bio : null;
    this.email = data?.email ? data?.email : null;
    this.phone = data?.phone ? data?.phone : null;
    this.resume = data?.resume ? data?.resume : null;
    this.website = data?.website ? data?.website : null;
    this.contactMethods = data?.contact_methods
      ? new ContactMethods(data.contact_methods)
      : null;
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
    this.story =
      data?.story && typeof data.story === 'string'
        ? new ContentURL(data.story)
        : null;
  }

  setID(id: string) {
    this.id = id;
  }

  getID() {
    if (this.url) {
      const path = new URL(this.url);
      const pathname = path.pathname.split('/');
      return pathname[1];
    }

    return null;
  }

  setName(name: string) {
    this.name = name;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setAvatarURL(url: string) {
    this.avatarURL = url;
  }

  setRepos(data: Array<RepoObject>) {
    this.repos = new Repos(data);
  }

  getRepos(data: Array<RepoObject>) {
    const repos = new Repos(data);
    return repos.collection.map((repo) => repo.toObject());
  }

  setOrganizations(organizations: Array<OrganizationObject>) {
    this.organizations = new Organizations(organizations);
  }

  getOrganizations(organizations: Array<OrganizationObject>) {
    const orgs = new Organizations(organizations);
    return orgs.list.map((org) => org.toOrganizationObject());
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

  getRepoQueries(data: Array<Record<string, any>>) {
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

  setStory(url: string) {
    this.story = new ContentURL(url);
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
      story: this.story ? this.story.url : null,
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
      skills: this.skills ? this.skills.toSkillsObject() : null,
      portfolio: this.portfolio ? this.portfolio.toPortfolioObject() : null,
    };
  }
}
