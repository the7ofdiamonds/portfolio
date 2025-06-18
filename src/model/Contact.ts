import { Model } from './Model';
import { Image, ImageObject } from './Image';

export interface ContactObject {
  id: string;
  title: string | null;
  url: string | null;
  image: ImageObject | null;
  value: string | null;
}

export class Contact extends Model {
  id: string;
  title: string | null;
  url: string | null;
  image: Image | null;
  value: string | null;

  constructor(data: ContactObject | Partial<ContactObject>) {
    super();

    this.id = data?.id ? data.id : '';
    this.title = data?.title ? data.title : null;
    this.url = data?.url ? data.url : null;
    this.image = data?.image ? new Image(data.image) : null;
    this.value = data?.value ? data.value : null;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setURL(url: string) {
    this.url = url;
  }

  setImage(image: Image) {
    this.image = image;
  }

  setValue(value: string) {
    this.value = value;
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
