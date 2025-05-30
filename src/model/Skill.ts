import { Image, ImageObject } from './Image';

import { snakeCaseToPath } from '../utilities/String';

export type SkillObject = {
  id: string;
  type: string;
  title: string | null;
  description: string | null;
  path: string | null;
  image: ImageObject | null;
  usage: number | null;
};

export class Skill {
  id: string;
  type: string;
  title: string | null;
  description: string | null;
  path: string | null;
  image: Image | null;
  usage: number | null;

  constructor(data: Record<string, any> | SkillObject = {}) {
    this.id = data?.id ? data.id : '';
    this.type = data?.type ? data.type : '';
    this.title = data?.title ? data.title : '';
    this.description = data?.description ? data.description : '';
    this.path = data?.path
      ? snakeCaseToPath(data.path)
      : snakeCaseToPath(this.type);
    this.usage = data?.usage ? data.usage : '';
    this.image = data?.image
      ? new Image({
          id: data?.image?.id,
          title: data?.image?.title,
          url: data?.image?.url,
          class_name: data?.image?.class_name,
        })
      : null;
  }

  setID(id: string) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setPath(path: string) {
    this.path = path;
  }

  setImage(image: Image) {
    this.image = image;
  }

  setUsage(usage: number) {
    this.usage = usage;
  }

  isValid(): boolean {
    if (this.id == '') {
      throw new Error('ID is not valid');
    }

    if (this.type == '') {
      throw new Error('Type is not valid');
    }

    if (this.title == '') {
      throw new Error('Title is not valid');
    }

    if (this.path == '') {
      throw new Error('Path is not valid');
    }

    return true;
  }

  toSkillObject(): SkillObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      description: this.description,
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}
