export class Version {
  major: number | null;
  minor: number | null;
  patch: number | null;

  constructor(projectVersion: string) {
    const version =
      typeof projectVersion === 'string' ? this.parse(projectVersion) : null;

    this.major = version ? version[0] : null;
    this.minor = version ? version[1] : null;
    this.patch = version ? version[2] : null;
  }

  parse(tag: string) {
    return typeof tag === 'string'
      ? tag.split('.').map((s) => parseInt(s))
      : '1.0.0'.split('.').map((s) => parseInt(s));
  }

  isEqual(tag: string) {}

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}