import { Model } from './Model';
import { Image, ImageObject } from './Image';

export interface ContactObject {
  id: string | null;
  title: string | null;
  url: string | null;
  image: ImageObject | null;
  value: string | null;
}

export class Contact extends Model {
  id: string | null;
  title: string | null;
  url: string | null;
  image: Image | null;
  value: string | null;

  constructor(data: ContactObject) {
    super();

    this.id = data.id ? data.id : null;
    this.title = data.title ? data.title : null;
    this.url = data.url ? data.url : null;
    this.image = data.image ? new Image(data.image) : null;
    this.value = data.value ? data.value : null;
  }

  toContactObject(): ContactObject {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      image: this.image ? this.image.toImageObject() : null,
      value: this.value,
    };
  }
}
