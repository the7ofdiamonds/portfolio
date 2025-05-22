import { Model } from './Model';

import { ContentURL } from './ContentURL';
import { RepoSize } from './RepoSize';
import { Contributor, ContributorObject } from './Contributor';
import { Repo } from './Repo';
import { ProjectDataObject } from './Project';

export type ProjectDetailsObject = {
  privacy: string | null;
  client_id: string | null;
  content: string | null;
  team_list: Array<ContributorObject> | null;
  story: string | null;
  repo_size: number | null;
};

export type ProjectDetailsDataObject = {
  privacy: string | null;
  client_id: string | null;
  content: string | null;
  team_list: Array<number> | null;
  story: string | null;
};

export class ProjectDetails extends Model {
  privacy: string | null;
  clientID: string | null;
  content: ContentURL | null;
  teamList: Array<Contributor> | null;
  story: ContentURL | null;
  repoSize: RepoSize | null;

  constructor(data?: ProjectDetailsObject) {
    super();

    this.privacy = data?.privacy ? data.privacy : 'private';
    this.clientID = data?.client_id ? data.client_id : '0';
    this.content = data?.content ? new ContentURL(data.content) : null;
    this.teamList = data?.team_list ? this.getTeamList(data.team_list) : null;
    this.story = data?.story ? new ContentURL(data.story) : null;
    this.repoSize = data?.repo_size ? new RepoSize(data.repo_size) : null;
  }

  setPrivacy(privacy: string) {
    this.privacy = privacy;
  }

  setClientID(id: string | null) {
    this.clientID = id;
  }

  setContentURL(url: string) {
    this.content = new ContentURL(url);
  }

  getTeamList(data: Array<ContributorObject>) {
    let teamList: Array<Contributor> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((contributor) => {
        teamList.push(new Contributor(contributor));
      });
    }

    return teamList;
  }

  setStory(url: string) {
    this.story = new ContentURL(url);
  }

  setRepoSize(size: number) {
    this.repoSize = new RepoSize(size);
  }

  setTeamList(team: Array<Contributor>) {
    this.teamList = team;
  }

  fromRepo(repo: Repo) {
    if (
      repo.contributors &&
      repo.contributors.list &&
      Array.isArray(repo.contributors.list) &&
      repo.contributors.list.length > 0
    ) {
      this.setTeamList(repo.contributors.list);
    }

    if (
      repo.contents &&
      repo.contents.details &&
      repo.contents.details.size > 0 &&
      repo.contents.details.downloadURL
    ) {
      this.setContentURL(repo.contents.details.downloadURL);
    }

    if (
      repo.contents &&
      repo.contents.story &&
      repo.contents.story.size > 0 &&
      repo.contents.story.downloadURL
    ) {
      this.setStory(repo.contents.story.downloadURL);
    }

    if (repo.size && repo.size > 0) {
      this.setRepoSize(repo.size);
    }

    if (
      repo.contributors &&
      Array.isArray(repo.contributors.list) &&
      repo.contributors.list.length > 0
    ) {
      this.setTeamList(repo.contributors.list);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.details) {
      if (data.details?.privacy) {
        this.setPrivacy(data.details.privacy);
      }

      if (data.details?.client_id) {
        this.setClientID(data.details.client_id);
      }
    }
  }

  toDetailsObject(): ProjectDetailsObject {
    return {
      privacy: this.privacy,
      client_id: this.clientID,
      content: this.content ? this.content.url : null,
      team_list: this.teamList
        ? this.teamList.map((contributor) => contributor.toContributorObject())
        : null,
      story: this.story ? this.story.url : null,
      repo_size: this.repoSize ? this.repoSize.amount : null,
    };
  }

  toDetailsDataObject(): ProjectDetailsDataObject {
    return {
      privacy: this.privacy,
      client_id: this.clientID,
      content: this.content ? this.content.url : null,
      team_list: this.teamList
        ? this.teamList
            .filter((contributor) => contributor.id)
            .map((contributor) => contributor.id)
        : null,
      story: this.story ? this.story.url : null,
    };
  }
}