import { Model } from './Model';

export type ImageObject = {
  id: string;
  title: string;
  url: string;
  class_name: string;
};

export class Image extends Model {
  id: string;
  title: string;
  url: string;
  className: string;

  constructor(data?: Partial<ImageObject> | ImageObject) {
    super();

    this.id = data?.id || '';
    this.title = data?.title || '';
    this.url = data?.url || '';
    this.className = data?.class_name || '';
  }

  setID(id: string) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setURL(url: string) {
    this.url = url;
  }

  setClassName(className: string) {
    this.className = className;
  }

  toImageObject(): ImageObject {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      class_name: this.className,
    };
  }
}
