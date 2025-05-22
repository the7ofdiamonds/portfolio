import { Model } from './Model';
import { Image, ImageObject } from './Image';

export type ProjectURLObject = {
  id: string | null;
  name: string | null;
  url: string | null;
  description: string;
  image: ImageObject | null;
};

export class ProjectURL extends Model {
  id: string;
  name: string;
  url: string | null;
  description: string;
  image: Image;

  constructor(data: Record<string, any> | ProjectURLObject = {}) {
    super();

    this.id = data?.id ? data.id : data?.name ? data.name.toLowerCase() : null;
    this.name = data?.name;
    this.url = data?.url ?? null;
    this.description = data?.description;
    this.image = new Image(data?.image);
  }

  setUrl(url: string) {
    this.url = url;
  }

  toProjectURLObject(): ProjectURLObject {
    return {
      id: this.id,
      name: this.name,
      url: this.url ? this.url : null,
      description: this.description,
      image: this.image.toImageObject(),
    };
  }
}
