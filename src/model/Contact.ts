import { Model } from './Model';
import { Image, ImageObject } from './Image';

export interface ContactObject {
  id: string;
  title: string | null;
  url: string | null;
  image: ImageObject | null;
  value: string | null;
  type: string | null;
  class_name: string | null;
  img_src: string | null;
}

export class Contact extends Model {
  id: string;
  title: string;
  url: string;
  image: Image | null;
  value: string;
  type: string;
  className: string;
  imgSrc: string;

  constructor(data: ContactObject | Partial<ContactObject>) {
    super();

    this.id = data?.id ? data.id : '';
    this.title = data?.title ? data.title : '';
    this.url = data?.url ? data.url : '';
    this.value = data?.value ? data.value : '';
    this.type = data?.type ? data.type : 'text';
    this.className = data?.class_name ? data.class_name : '';
    this.imgSrc = data?.img_src ? data.img_src : '';
    this.image = data?.image
      ? new Image(data.image)
      : new Image({
          id: this.id,
          title: this.title,
          class_name: this.className,
          url: this.imgSrc,
        });
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

  setType(type: string) {
    this.type = type;
  }

  setClassName(className: string) {
    this.className = className;
  }

  setImgSrc(imgSrc: string) {
    this.imgSrc = imgSrc;
  }

  toContactObject(): ContactObject {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      image: this.image ? this.image.toImageObject() : null,
      value: this.value,
      type: this.type,
      class_name: this.className,
      img_src: this.imgSrc,
    };
  }
}
