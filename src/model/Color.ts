import { Model } from './Model';

export type ColorObject = {
  id: string;
  name: string;
  value: string;
};

export class Color extends Model {
  id: string;
  name: string;
  value: string;

  constructor(data: Record<string, any> | ColorObject = {}) {
    super();

    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
    this.value = data?.value ?? '#000';
  }

  toColorObject(): ColorObject {
    return {
      id: this.id,
      name: this.name,
      value: this.value,
    };
  }
}
