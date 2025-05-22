import { Image, ImageObject } from './Image';
import { Model } from './Model';

export type GalleryObject = {
  logos: Array<ImageObject> | null;
  icons: Array<ImageObject> | null;
  animations: Array<ImageObject> | null;
  uml_diagrams: Array<ImageObject> | null;
  screenshots: Array<ImageObject> | null;
  previews: Array<ImageObject> | null;
};

export class Gallery extends Model {
  logos: Array<Image> | null;
  icons: Array<Image> | null;
  animations: Array<Image> | null;
  umlDiagrams: Array<Image> | null;
  screenshots: Array<Image> | null;
  previews: Array<Image> | null;
  images: Array<Image> | null;

  constructor(data: Record<string, any> | GalleryObject = {}) {
    super();

    this.logos = Array.isArray(data?.logos)
      ? this.toArrayImage(data.logos)
      : null;
    this.icons = Array.isArray(data?.icons)
      ? this.toArrayImage(data.icons)
      : null;
    this.animations = Array.isArray(data?.animations)
      ? this.toArrayImage(data.animations)
      : null;
    this.umlDiagrams = Array.isArray(data?.uml_diagrams)
      ? this.toArrayImage(data.uml_diagrams)
      : null;
    this.screenshots = Array.isArray(data?.screenshots)
      ? this.toArrayImage(data.screenshots)
      : null;
    this.previews = Array.isArray(data?.previews)
      ? this.toArrayImage(data.previews)
      : null;
    this.images = [
      ...(this.logos ?? []),
      ...(this.icons ?? []),
      ...(this.animations ?? []),
      ...(this.umlDiagrams ?? []),
      ...(this.screenshots ?? []),
      ...(this.previews ?? []),
    ];
  }

  toArrayImage(data: Array<Record<string, any>>) {
    const images: Array<Image> = [];

    data.forEach((image) => {
      images.push(new Image(image));
    });

    return images;
  }

  toObject(): Record<string, any> {
    return {
      logos:
        Array.isArray(this.logos) && this.logos.length > 0
          ? this.logos.map((logo) => logo.toObject())
          : null,
      icons:
        Array.isArray(this.icons) && this.icons.length > 0
          ? this.icons.map((icon) => icon.toObject())
          : null,
      animations:
        Array.isArray(this.animations) && this.animations.length > 0
          ? this.animations.map((animation) => animation.toObject())
          : null,
      uml_diagrams:
        Array.isArray(this.umlDiagrams) && this.umlDiagrams.length > 0
          ? this.umlDiagrams.map((umlDiagram) => umlDiagram.toObject())
          : null,
      screenshots:
        Array.isArray(this.screenshots) && this.screenshots.length > 0
          ? this.screenshots.map((screenshot) => screenshot.toImageObject())
          : null,
    };
  }

  toGalleryObject(): GalleryObject {
    return {
      logos:
        Array.isArray(this.logos) && this.logos.length > 0
          ? this.logos.map((logo) => logo.toImageObject())
          : null,
      icons:
        Array.isArray(this.icons) && this.icons.length > 0
          ? this.icons.map((icon) => icon.toImageObject())
          : null,
      animations:
        Array.isArray(this.animations) && this.animations.length > 0
          ? this.animations.map((animation) => animation.toImageObject())
          : null,
      uml_diagrams:
        Array.isArray(this.umlDiagrams) && this.umlDiagrams.length > 0
          ? this.umlDiagrams.map((umlDiagram) => umlDiagram.toImageObject())
          : null,
      screenshots:
        Array.isArray(this.screenshots) && this.screenshots.length > 0
          ? this.screenshots.map((screenshot) => screenshot.toImageObject())
          : null,
      previews:
        Array.isArray(this.previews) && this.previews.length > 0
          ? this.previews.map((preview) => preview.toImageObject())
          : null,
    };
  }
}