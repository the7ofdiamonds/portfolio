import { Model } from './Model';
import { Version } from './Version';

export type FeatureObject = {
  id: string | number;
  description: string;
  version: string | null;
};

export class Feature extends Model {
  id: string | number;
  description: string;
  version: Version | null;

  constructor(data?: FeatureObject) {
    super();

    this.id = data?.id ?? '';
    this.description = data?.description ?? '';
    this.version = data?.version ? new Version(data.version) : null;
  }

  order(version: Version) {
    const major =
      (this.version && this.version.major ? this.version.major : 1) -
      (version && version.major ? version.major : 1);
    const minor =
      (this.version && this.version.minor ? this.version.minor : 0) -
      (version && version.minor ? version.minor : 0);
    const patch =
      (this.version && this.version.patch ? this.version.patch : 0) -
      (version && version.patch ? version.patch : 0);

    return major + minor + patch;
  }

  setID(id: string | number) {
    this.id = id;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setVersion(version: string) {
    this.version = new Version(version);
  }

  toFeatureObject(): FeatureObject {
    return {
      id: this.id,
      description: this.description,
      version: this.version ? this.version.toString() : null,
    };
  }
}