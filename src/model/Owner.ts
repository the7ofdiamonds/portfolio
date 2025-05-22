import {Model} from './Model';

export type OwnerGQL = {
  id: string;
  __typename: string;
  login: string;
};

export interface OwnerObject {
  id: string | null;
  type: string | null;
  login: string | null;
  name: string | null;
  company: string | null;
  email: string | null;
  avatar_url: string | null;
  url: string | null;
  repos_url: string | null;
}

export class Owner extends Model {
  id: string | null;
  type: string | null;
  login: string | null;
  name: string | null;
  company: string | null;
  email: string | null;
  avatarURL: string | null;
  url: string | null;
  reposURL: string | null;

  constructor(data: Record<string, any> | OwnerObject = {}) {
    super();

    this.id = data?.id ? data.id : null;
    this.type = data?.type ? data.type : null;
    this.login = data?.login ? data.login : null;
    this.name = data?.name ? data.name : null;
    this.company = data?.company ? data.company : null;
    this.email = data?.email ? data.email : null;
    this.avatarURL = data?.avatar_url ? data.avatar_url : null;
    this.url = data?.url ? data.url : null;
    this.reposURL = data?.repos_url ? data?.repos_url : null;
  }

  fromGitHubGraphQL(owner: OwnerGQL) {
    this.id = owner.id;
    this.type = owner.__typename;
    this.login = owner.login;
  }

  toOwnerObject(): OwnerObject {
    return {
      id: this.id,
      type: this.type,
      login: this.login,
      name: this.name,
      company: this.company,
      email: this.email,
      avatar_url: this.avatarURL,
      url: this.url,
      repos_url: this.reposURL,
    };
  }
}