import { AuthenticatedUserRepoResponse } from '@/controllers/githubSlice';
import { Model } from './Model';
import { Repo, RepoObject, RepositoryGQL } from './Repo';
import { GitHubRepoQuery } from './GitHubRepoQuery';

export class Repos extends Model {
  collection: Array<Repo>;
  count: number = 0;
  queries: Array<GitHubRepoQuery>;

  constructor(repos?: Array<RepoObject>) {
    super();

    this.collection =
      repos && Array.isArray(repos) ? repos.map((repo) => new Repo(repo)) : [];
    this.count = this.collection.length;
    this.queries = repos && Array.isArray(repos) ? this.getQueries(repos) : [];
  }

  setCollection(collection: Array<Repo>) {
    this.collection = collection;
  }

  setQueries(queries: Array<GitHubRepoQuery>) {
    this.queries = queries;
  }

  getQueries(repos: Array<RepoObject>) {
    if (repos && Array.isArray(repos) && repos.length > 0) {
      return repos
        .map((repo) => {
          if (repo.owner?.login && repo.name) {
            return new GitHubRepoQuery(repo.owner.login, repo.name);
          }
          return null;
        })
        .filter((query): query is GitHubRepoQuery => query !== null);
    }
    return [];
  }

  fromGitHubGraphQL(repos: Array<RepositoryGQL>) {
    let repositories: Array<Repo> = [];

    if (Array.isArray(repos)) {
      repos.forEach((repo) => {
        const repository = new Repo();
        repository.fromGitHubGraphQL(repo);
        repositories.push(repository);
      });
    }

    this.collection = repositories;
    this.count = this.collection.length;
  }

  fromGitHub(repos?: Array<RepoObject>) {
    this.collection = repos ? repos.map((repo) => new Repo(repo)) : [];
    this.count = this.collection.length;
    this.queries = repos && Array.isArray(repos) ? this.getQueries(repos) : [];
  }

  fromGitHubAuthenticatedUser(repos: AuthenticatedUserRepoResponse) {
    console.log(repos);
  }
}
