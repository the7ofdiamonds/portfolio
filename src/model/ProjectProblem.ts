import { Model } from './Model';
import { Gallery, GalleryObject } from './Gallery';
import { DocumentURL } from '@/model/DocumentURL';
import { ContentURL } from './ContentURL';
import { Repo } from './Repo';
import { ProjectDataObject } from './Project';

export type ProjectProblemObject = {
  gallery: GalleryObject | null;
  content_url: string | null;
  whitepaper_url: string | null;
};

export type ProjectProblemDataObject = {
  gallery: GalleryObject | null;
  content_url: string | null;
  whitepaper_url: string | null;
};

export class ProjectProblem extends Model {
  gallery: Gallery | null;
  contentURL: ContentURL | null;
  whitepaperURL: DocumentURL | null;

  constructor(data: Record<string, any> | ProjectProblemDataObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
    this.whitepaperURL = data?.whitepaper_url
      ? new DocumentURL(data.whitepaper_url)
      : null;
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setWhitepaperURL(url: string) {
    this.whitepaperURL = new DocumentURL(url);
  }

  fromRepo(repo: Repo) {
    if (
      repo.contents &&
      repo.contents.problem &&
      repo.contents.problem.downloadURL
    ) {
      this.setContentURL(repo.contents.problem.downloadURL);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.problem) {
      if (data.problem?.gallery) {
        const gallery = new Gallery(data?.problem.gallery);
        this.setGallery(gallery);
      }

      if (data.problem.whitepaper_url) {
        this.setWhitepaperURL(data.problem.whitepaper_url);
      }
    }
  }

  toProjectProblemObject(): ProjectProblemObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      whitepaper_url: this.whitepaperURL ? this.whitepaperURL.url : null,
    };
  }

  toProjectProblemDataObject(): ProjectProblemDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      whitepaper_url: this.whitepaperURL?.url ? this.whitepaperURL.url : null,
    };
  }
}