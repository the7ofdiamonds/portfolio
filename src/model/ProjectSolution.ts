import { Model } from './Model';
import { Feature, FeatureObject } from './Feature';
import {
  ProjectURLs,
  ProjectURLsDataObject,
  ProjectURLsObject,
} from './ProjectURLs';
import { Gallery, GalleryObject } from './Gallery';
import { ContentURL } from './ContentURL';
import { Repo } from './Repo';
import { ProjectDataObject } from './Project';

export type ProjectSolutionObject = {
  gallery: GalleryObject | null;
  features: Array<FeatureObject> | null;
  content_url: string | null;
  project_urls: ProjectURLsObject | null;
};

export type ProjectSolutionDataObject = {
  gallery: GalleryObject | null;
  features: Array<FeatureObject> | null;
  content_url: string | null;
  project_urls: ProjectURLsDataObject | null;
};

export class ProjectSolution extends Model {
  gallery: Gallery | null;
  features: Set<Feature> | null;
  contentURL: ContentURL | null;
  projectURLs: ProjectURLs | null;

  constructor(data: Record<string, any> | ProjectSolutionObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : new Gallery();
    this.features = data?.features ? this.getFeatures(data.features) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
    this.projectURLs =
      data?.project_urls &&
      (data.project_urls.homepage ||
        data.project_urls.ios ||
        data.project_urls.android)
        ? new ProjectURLs(data.project_urls)
        : null;
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setFeatures(features: Set<Feature>) {
    this.features = features;
  }

  getFeatures(data?: Array<FeatureObject>): Set<Feature> {
    let features = new Set<Feature>();

    if (data && data?.length > 0) {
      data.forEach((feature) => {
        features.add(new Feature(feature));
      });
    }

    return features;
  }

  setProjectURLs(projectURLs: ProjectURLs) {
    this.projectURLs = projectURLs;
  }

  fromRepo(repo: Repo) {
    if (repo.contents?.solution?.downloadURL) {
      this.setContentURL(repo.contents.solution.downloadURL);
    }

    if (repo?.homepage) {
      const projectURLs = new ProjectURLs();
      projectURLs.setHomepage(repo.homepage);
      this.setProjectURLs(projectURLs);
    }

    if (repo.issues?.features) {
      this.setFeatures(new Set(repo.issues.toFeatures(repo.issues?.features)));
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.solution) {
      if (data?.solution?.project_urls) {
        const projectURLs = new ProjectURLs();

        if (data.solution.project_urls?.homepage) {
          projectURLs.setHomepage(data.solution.project_urls.homepage);
        }

        if (data.solution.project_urls?.ios) {
          projectURLs?.setIos(data.solution.project_urls.ios);
        }

        if (data.solution.project_urls?.android) {
          projectURLs.setAndroid(data.solution.project_urls.android);
        }
      }

      if (data.solution?.gallery) {
        const gallery = new Gallery(data?.solution?.gallery);
        this.setGallery(gallery);
      }
    }
  }

  toProjectSolutionObject(): ProjectSolutionObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      features: this.features
        ? Array.from(this.features).map((feature) => feature.toFeatureObject())
        : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      project_urls: this.projectURLs
        ? this.projectURLs.toProjectURLsObject()
        : null,
    };
  }

  toProjectSolutionDataObject(): ProjectSolutionDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      features: this.features
        ? Array.from(this.features).map((feature) => feature.toFeatureObject())
        : null,
      content_url: this.contentURL?.url ? this.contentURL.url : null,
      project_urls: this.projectURLs
        ? this.projectURLs.toProjectURLsDataObject()
        : null,
    };
  }
}