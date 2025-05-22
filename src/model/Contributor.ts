import { RepoContributor } from '@/controllers/githubSlice';

export type ContributorObject = {
  id: number;
  type: string;
  login: string | null;
  avatar_url: string | null;
  // node_id: string;
  // contributions: number;
  // events_url: string;
  // followers_url: string;
  // following_url: string;
  // gists_url: string;
  // gravatar_id: string;
  // html_url: string;
  // organizations_url: string;
  // received_events_url: string;
  // repos_url: string;
  // site_admin: boolean;
  // starred_url: string;
  // subscriptions_url: string;
  // url: string;
  // user_view_type: string;
};

export class Contributor {
  id: number;
  type: string;
  login: string | null;
  avatarURL: string | null;

  constructor(data?: ContributorObject) {
    this.id = data?.id ? data.id : 0;
    this.type = data?.type ? data.type : 'User';
    this.login = data?.login ? data?.login : null;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
  }

  fromGitHub(data: RepoContributor): void {
    this.id = data?.id ? data.id : 0;
    this.type = data?.type ? data.type : 'User';
    this.login = data?.login ? data?.login : null;
    this.avatarURL = data?.avatar_url ? data?.avatar_url : null;
  }

  toContributorObject(): ContributorObject {
    return {
      id: this.id,
      type: this.type,
      login: this.login,
      avatar_url: this.avatarURL,
    };
  }
}