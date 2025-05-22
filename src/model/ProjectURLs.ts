import { Model } from './Model';
import { ProjectURL, ProjectURLObject } from './ProjectURL';
import { Image } from './Image';

export type ProjectURLsObject = {
  homepage: ProjectURLObject | null;
  ios: ProjectURLObject | null;
  android: ProjectURLObject | null;
};

export type ProjectURLsDataObject = {
  homepage: string | null;
  ios: string | null;
  android: string | null;
};

export class ProjectURLs extends Model {
  homepage: ProjectURL | null;
  ios: ProjectURL | null;
  android: ProjectURL | null;

  constructor(data: Record<string, any> | ProjectURLsObject = {}) {
    super();

    this.homepage = null;
    this.ios = null;
    this.android = null;

    data?.homepage?.url ? this.setHomepage(data.homepage.url) : this.homepage;
    data?.ios?.url ? this.setIos(data.ios.url) : this.ios;
    data?.android?.url ? this.setAndroid(data.android.url) : this.android;
  }

  setHomepage(url: string) {
    if (!url) {
      this.homepage = null;
    }

    let name = 'Homepage';

    this.homepage = new ProjectURL({
      id: name.toLowerCase(),
      name: name,
      description: 'Website of the project',
      url: url,
      image: new Image({
        id: name.toLowerCase(),
        class_name: 'fa-solid fa-house',
      }).toImageObject(),
    });
  }

  setIos(url: string) {
    if (!url) {
      this.ios = null;
    }

    let name = 'Apple App Store';

    this.ios = new ProjectURL({
      id: name.toLowerCase(),
      name: name,
      description: 'Link to iOS application',
      url: url,
      image: new Image({
        id: name.toLowerCase(),
        class_name: 'fa-brands fa-app-store-ios',
      }).toImageObject(),
    });
  }

  setAndroid(url: string) {
    if (!url) {
      this.android = null;
    }

    let name = 'Google Play Store';

    this.android = new ProjectURL({
      id: name.toLowerCase(),
      name: name,
      description: 'Link to Android application',
      url: url,
      image: new Image({
        id: name.toLowerCase(),
        class_name: 'fa-brands fa-google-play',
      }).toImageObject(),
    });
  }

  toProjectURLsObject(): ProjectURLsObject {
    return {
      homepage: this.homepage ? this.homepage.toProjectURLObject() : null,
      ios: this.ios ? this.ios.toProjectURLObject() : null,
      android: this.android ? this.android.toProjectURLObject() : null,
    };
  }

  toProjectURLsDataObject(): ProjectURLsDataObject {
    return {
      homepage: this.homepage?.url ? this.homepage.url : null,
      ios: this.ios?.url ? this.ios.url : null,
      android: this.android?.url ? this.android.url : null,
    };
  }
}