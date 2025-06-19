import { Color } from '@/model/Color';

export class Colors {
  list: Set<Color>;

  constructor(list?: Array<Color>) {
    this.list = list ? new Set(list) : new Set();
  }

  addColor(color: Color) {
    this.list.add(color);
  }

  removeColor(color: Color) {
    this.list.delete(color);
  }

  existsInSet(color: Color) {
    const map = new Map(
      Array.from(this.list).map((color) => [color.id, color])
    );

    return map.has(color.id);
  }
}
