import { Model } from './Model';

import { snakeCaseToPath } from '../utilities/String';
import { Image, ImageObject } from './Image';

export type TaxonomyObject = {
  id: string;
  type: string;
  title: string;
  path: string;
  image: ImageObject | null;
  usage: number;
};

class Taxonomy extends Model {
  id: string;
  type: string;
  title: string;
  path: string;
  image: Image | null = new Image();
  usage: number;

  constructor(data: Record<string, any> | TaxonomyObject = {}) {
    super();

    this.id = data?.id ? data.id : '';
    this.type = data?.type ? data.type : '';
    this.title = data?.title ? data.title : '';
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
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}

export default Taxonomy;

export type ProjectTypeObject = {
  id: string;
  type: string;
  title: string;
  path: string;
  image: ImageObject | null;
  usage: number;
};

export class ProjectType extends Taxonomy {
  readonly type: string = 'project_type';
  readonly path: string = 'project-types';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toProjectTypeObject(): ProjectTypeObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}

export type LanguageObject = {
  id: string;
  type: string;
  title: string;
  path: string;
  image: ImageObject | null;
  usage: number;
};

export class Language extends Taxonomy {
  readonly type: string = 'language';
  readonly path: string = 'languages';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toLanguageObject(): LanguageObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}

export type FrameworkObject = {
  id: string;
  type: string;
  title: string;
  path: string;
  image: ImageObject | null;
  usage: number;
};

export class Framework extends Taxonomy {
  readonly type: string = 'framework';
  readonly path: string = 'frameworks';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toFrameworkObject(): FrameworkObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}

export type TechnologyObject = {
  id: string;
  type: string;
  title: string;
  path: string;
  image: ImageObject | null;
  usage: number;
};

export class Technology extends Taxonomy {
  readonly type: string = 'technology';
  readonly path: string = 'technologies';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toTechnologyObject(): TechnologyObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      path: this.path,
      image: this.image ? this.image.toImageObject() : null,
      usage: this.usage,
    };
  }
}

export type ServiceObject = {
  id: string;
  type: string;
  title: string;
  path: string;
  image: ImageObject | null;
  usage: number;
};

export class Service extends Taxonomy {
  readonly type: string = 'service';
  readonly path: string = 'services';

  constructor(data?: Record<string, any>) {
    super(data);
  }

  toServiceObject(): ServiceObject {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
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
