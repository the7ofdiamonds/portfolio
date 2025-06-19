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
  logos: Array<Image>;
  icons: Array<Image>;
  animations: Array<Image>;
  umlDiagrams: Array<Image>;
  screenshots: Array<Image>;
  previews: Array<Image>;
  images: Array<Image>;

  constructor(data?: GalleryObject | Partial<GalleryObject>) {
    super();

    this.logos = Array.isArray(data?.logos)
      ? this.toArrayImage(data.logos)
      : [];
    this.icons = Array.isArray(data?.icons)
      ? this.toArrayImage(data.icons)
      : [];
    this.animations = Array.isArray(data?.animations)
      ? this.toArrayImage(data.animations)
      : [];
    this.umlDiagrams = Array.isArray(data?.uml_diagrams)
      ? this.toArrayImage(data.uml_diagrams)
      : [];
    this.screenshots = Array.isArray(data?.screenshots)
      ? this.toArrayImage(data.screenshots)
      : [];
    this.previews = Array.isArray(data?.previews)
      ? this.toArrayImage(data.previews)
      : [];
    this.images = [
      ...this.logos,
      ...this.icons,
      ...this.animations,
      ...this.umlDiagrams,
      ...this.screenshots,
      ...this.previews,
    ];
  }

  setLogos(logos: Array<Image>) {
    this.logos = logos;
  }

  setIcons(icons: Array<Image>) {
    this.icons = icons;
  }

  setAnimations(animations: Array<Image>) {
    this.animations = animations;
  }

  setUmlDiagrams(umlDiagrams: Array<Image>) {
    this.umlDiagrams = umlDiagrams;
  }

  setScreenshots(screenshots: Array<Image>) {
    this.screenshots = screenshots;
  }

  setPreviews(previews: Array<Image>) {
    this.previews = previews;
  }

  toArrayImage(data: Array<ImageObject>) {
    return data.map((image) => new Image(image));
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
