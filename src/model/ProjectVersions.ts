import { Model } from './Model';
import { Version } from './Version';

export type ProjectVersionsObject = {
  history: Array<string>;
  current: string;
  future: Array<string>;
};

export class ProjectVersions extends Model {
  history: Set<string>;
  current: string;
  future: Set<string>;

  constructor(data: Record<string, any> | ProjectVersionsObject = {}) {
    super();

    this.history = data?.history ? new Set(data?.history) : new Set();
    this.current = data?.current ?? '1.0.0';
    this.future = data?.future ? new Set(data?.future) : new Set();
  }

  order() {
    const path = [...this.history, ...this.future];

    return path
      .map((v) => new Version(v))
      .sort((a, b) => {
        const majorA = a.major ?? 0;
        const majorB = b.major ?? 0;
        if (majorA !== majorB) return majorA - majorB;

        const minorA = a.minor ?? 0;
        const minorB = b.minor ?? 0;
        if (minorA !== minorB) return minorA - minorB;

        const patchA = a.patch ?? 0;
        const patchB = b.patch ?? 0;
        return patchA - patchB;
      })
      .map((v) => v.toString());
  }

  toProjectVersionsObject(): ProjectVersionsObject {
    return {
      history: Array.from(this.history),
      current: this.current,
      future: Array.from(this.future),
    };
  }
}