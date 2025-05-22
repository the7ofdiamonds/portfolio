export type ProjectVersionObject = {
  id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  make_latest: string;
};

export class ProjectVersion {
  id: string;
  tagName: string;
  targetCommitish: string;
  name: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  makeLatest: string;

  constructor(version: Record<string, any> | ProjectVersionObject = {}) {
    this.id = version.id;
    this.tagName = version.tag_name;
    this.targetCommitish = version.target_commitish;
    this.name = version.name;
    this.body = version.body;
    this.draft = version.draft;
    this.prerelease = version.prerelease;
    this.makeLatest = version.make_latest;
  }

  toProjectVersionObject(): ProjectVersionObject {
    return {
      id: this.id,
      tag_name: this.tagName,
      target_commitish: this.targetCommitish,
      name: this.name,
      body: this.body,
      draft: this.draft,
      prerelease: this.prerelease,
      make_latest: this.makeLatest,
    };
  }
}
