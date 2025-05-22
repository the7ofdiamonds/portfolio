import { ProjectVersions } from './ProjectVersions';

export class Roadmap {
  path: Array<string>;

  constructor(versions: ProjectVersions) {
    this.path = versions.order();
  }
}
