import { Model } from './Model';

import { snakeCaseToPath } from '../utilities/String';
import { Image, ImageObject } from './Image';

export type TaxonomyObject = {
  id: string;
  type: string;
  title: string;
  description: string;
  path: string;
  image: ImageObject | null;
  usage: number;
};

export class Taxonomy extends Model {
  id: string;
  type: string;
  title: string;
  description: string;
  path: string;
  image: Image | null;
  usage: number;

  constructor(data: Record<string, any> | TaxonomyObject = {}) {
    super();

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

  toObject() {
    return super.toObject();
  }

  toTaxonomyObject(): TaxonomyObject {
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

export type ProjectTypeObject = TaxonomyObject;

export class ProjectType extends Taxonomy {
  readonly type: string = 'Project Types';
  readonly path: string = 'project-types';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toProjectTypeObject(): ProjectTypeObject {
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

export type LanguageObject = TaxonomyObject;

export class Language extends Taxonomy {
  readonly type: string = 'Languages';
  readonly path: string = 'languages';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toLanguageObject(): LanguageObject {
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

export type FrameworkObject = TaxonomyObject;

export class Framework extends Taxonomy {
  readonly type: string = 'Frameworks';
  readonly path: string = 'frameworks';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toFrameworkObject(): FrameworkObject {
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

export type TechnologyObject = TaxonomyObject;

export class Technology extends Taxonomy {
  readonly type: string = 'Technologies';
  readonly path: string = 'technologies';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toTechnologyObject(): TechnologyObject {
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

export type ServiceObject = TaxonomyObject;

export class Service extends Taxonomy {
  readonly type: string = 'Services';
  readonly path: string = 'services';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toServiceObject(): ServiceObject {
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

export const existsInSet = (taxonomy: Taxonomy, set: Set<Taxonomy>) => {
  const map = new Map(Array.from(set).map((tax) => [tax.id, tax]));

  return map.has(taxonomy.id);
};
