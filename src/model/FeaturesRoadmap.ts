import {Feature} from './Feature';
import {Version} from './Version';

export class FeaturesRoadmap {
  path: Array<Feature> | null;

  constructor(features: Set<Feature> = new Set()) {
    this.path =
      features.size > 0
        ? Array.from(features).sort((a, b) => a.order(b.version ?? new Version('1.0.0')))
        : null;
  }
}