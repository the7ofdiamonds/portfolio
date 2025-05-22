import { Model } from './Model';
import { CheckList, CheckListObject } from './CheckList';
import { Gallery, GalleryObject } from './Gallery';
import { ContentURL } from './ContentURL';
import { Task } from './Task';
import { Repo } from './Repo';
import { ProjectDataObject } from './Project';

export type ProjectDeliveryObject = {
  check_list: CheckListObject | null;
  gallery: GalleryObject | null;
  content_url: string | null;
};

export type ProjectDeliveryDataObject = {
  check_list: CheckListObject | null;
  gallery: GalleryObject | null;
  content_url: string | null;
};

export class ProjectDelivery extends Model {
  checkList: CheckList | null;
  gallery: Gallery | null;
  contentURL: ContentURL | null;

  constructor(data: Record<string, any> | ProjectDeliveryObject = {}) {
    super();

    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
  }

  setCheckList(tasks: Array<Task>) {
    if (tasks && Array.isArray(tasks) && tasks.length > 0) {
      const checkList = new CheckList();
      checkList.setTasks(new Set(tasks));
      this.checkList = checkList;
    }
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  fromRepo(repo: Repo) {
    if (repo.contents?.delivery?.downloadURL) {
      this.setContentURL(repo.contents.delivery.downloadURL);
    }

    if (repo.issues?.delivery) {
      const tasks = repo.issues.toTask(repo.issues.delivery);
      this.setCheckList(tasks);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data.process?.delivery) {
      if (
        data.process.delivery.gallery &&
        ((data.process.delivery.gallery.animations &&
          data.process.delivery.gallery.animations?.length > 0) ||
          (data.process.delivery.gallery.icons &&
            data.process.delivery.gallery.icons.length > 0) ||
          (data.process.delivery.gallery.logos &&
            data.process.delivery.gallery.logos.length > 0) ||
          (data.process.delivery.gallery.previews &&
            data.process.delivery.gallery.previews.length > 0) ||
          (data.process.delivery.gallery.screenshots &&
            data.process.delivery.gallery.screenshots.length > 0) ||
          (data.process.delivery.gallery.uml_diagrams &&
            data.process.delivery.gallery.uml_diagrams.length > 0))
      ) {
        const gallery = new Gallery(data.process.delivery.gallery);
        this.setGallery(gallery);
      }
    }
  }

  toProjectDeliveryObject(): ProjectDeliveryObject {
    return {
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }

  toProjectDeliveryDataObject(): ProjectDeliveryDataObject {
    return {
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }
}
