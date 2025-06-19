import { Model } from './Model';
import { Gallery, GalleryObject } from './Gallery';
import { Color, ColorObject } from './Color';
import { CheckList, CheckListObject } from './CheckList';
import { ContentURL, ContentURLObject } from './ContentURL';
import { Task } from './Task';
import { Repo } from './Repo';
import { ProjectDataObject } from './Project';
import { Colors } from './Colors';

export type ProjectDesignObject = {
  gallery: GalleryObject | null;
  check_list: CheckListObject | null;
  colors_list: Array<ColorObject> | null;
  content_url: string | null;
};

export type ProjectDesignDataObject = {
  gallery: GalleryObject | null;
  check_list: CheckListObject | null;
  colors_list: Array<ColorObject> | null;
  content_url: string | null;
};

export class ProjectDesign extends Model {
  gallery: Gallery | null;
  checkList: CheckList | null;
  colors: Colors | null;
  contentURL: ContentURL | null;

  constructor(data?: ProjectDesignObject | ProjectDesignObject) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.colors =
      data?.colors_list &&
      Array.isArray(data.colors_list) &&
      data.colors_list.length > 0
        ? new Colors(data.colors_list.map((color) => new Color(color)))
        : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  setCheckList(tasks: Array<Task>) {
    if (tasks && Array.isArray(tasks) && tasks.length > 0) {
      const checkList = new CheckList();
      checkList.setTasks(new Set(tasks));
      this.checkList = checkList;
    }
  }

  setColors(colors: Array<Color>) {
    this.colors = new Colors(colors);
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  fromRepo(repo: Repo) {
    if (repo.contents?.design?.downloadURL) {
      this.setContentURL(repo.contents.design.downloadURL);
    }

    if (repo.issues?.design) {
      const tasks = repo.issues?.toTask(repo.issues.design);
      this.setCheckList(tasks);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data.process && data.process.design) {
      if (
        data.process.design.gallery &&
        ((data.process.design.gallery.animations &&
          data.process.design.gallery.animations?.length > 0) ||
          (data.process.design.gallery.icons &&
            data.process.design.gallery.icons.length > 0) ||
          (data.process.design.gallery.logos &&
            data.process.design.gallery.logos.length > 0) ||
          (data.process.design.gallery.previews &&
            data.process.design.gallery.previews.length > 0) ||
          (data.process.design.gallery.screenshots &&
            data.process.design.gallery.screenshots.length > 0) ||
          (data.process.design.gallery.uml_diagrams &&
            data.process.design.gallery.uml_diagrams.length > 0))
      ) {
        const gallery = new Gallery(data?.process.design.gallery);
        this.setGallery(gallery);
      }

      if (data?.process?.design?.colors_list) {
        const colors = Array.from(data?.process?.design?.colors_list).map(
          (color) => new Color(color as Record<string, any>)
        );
        this.setColors(colors);
      }
    }
  }

  toProjectDesignObject(): ProjectDesignObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      colors_list: this.colors
        ? Array.from(this.colors.list).map((color) => color.toColorObject())
        : null,
      content_url: this.contentURL ? this.contentURL.url : null,
    };
  }

  toProjectDesignDataObject(): ProjectDesignDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      colors_list: this.colors
        ? Array.from(this.colors.list).map((color) => color.toColorObject())
        : null,
      content_url: this.contentURL?.url ? this.contentURL.url : null,
    };
  }
}
