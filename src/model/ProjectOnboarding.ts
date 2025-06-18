import { Color, ColorObject } from './Color';
import { ContactMethods, ContactMethodsObject } from './ContactMethods';
import { Image, ImageObject } from './Image';

export type ProjectOnboardingObject = {
  id: string | null;
  client_id: string | null;
  project_title: string | null;
  deadline: string | null;
  location: string | null;
  website: string | null;
  hosting: string | null;
  satisfied: string | null;
  signage: string | null;
  social_networks: ContactMethodsObject | null;
  logos: Array<ImageObject> | null;
  colors: Array<ColorObject> | null;
  plan: string | null;
};

export class ProjectOnboarding {
  id: string | null;
  clientID: string | null;
  projectTitle: string | null;
  deadline: string | null;
  location: string | null;
  website: string | null;
  hosting: string | null;
  satisfied: string | null;
  signage: string | null;
  socialNetworks: ContactMethods | null;
  logos: Set<Image> | null;
  colors: Set<Color> | null;
  plan: string | null;

  constructor(data?: ProjectOnboardingObject) {
    this.id = data?.id ? data.id : null;
    this.clientID = data?.client_id ? data.client_id : null;
    this.projectTitle = data?.project_title ? data.project_title : null;
    this.deadline = data?.deadline ? data.deadline : null;
    this.location = data?.location ? data.location : null;
    this.website = data?.website ? data.website : null;
    this.hosting = data?.hosting ? data.hosting : null;
    this.satisfied = data?.satisfied ? data.satisfied : null;
    this.signage = data?.signage ? data.signage : null;
    this.socialNetworks = data?.social_networks
      ? new ContactMethods(data.social_networks)
      : null;
    this.logos = data?.logos
      ? new Set(data.logos.map((logo) => new Image(logo)))
      : null;
    this.colors = data?.colors
      ? new Set(data.colors.map((color) => new Color(color)))
      : null;
    this.plan = data?.plan ? data.plan : null;
  }

  toProjectOnboardingObject(): ProjectOnboardingObject {
    return {
      id: this.id,
      client_id: this.clientID,
      project_title: this.projectTitle,
      deadline: this.deadline,
      location: this.location,
      website: this.website,
      hosting: this.hosting,
      satisfied: this.satisfied,
      signage: this.signage,
      social_networks: this.socialNetworks
        ? this.socialNetworks.toContactMethodsObject()
        : null,
      logos: this.logos
        ? Array.from(this.logos).map((logo) => logo.toImageObject())
        : null,
      colors: this.colors
        ? Array.from(this.colors).map((color) => color.toColorObject())
        : null,
      plan: this.plan,
    };
  }
}
