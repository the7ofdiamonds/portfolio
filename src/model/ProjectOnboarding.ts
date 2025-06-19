import { Color, ColorObject } from './Color';
import { ContactMethods, ContactMethodsObject } from './ContactMethods';
import { Image, ImageObject } from './Image';

export type ProjectOnboardingObject = {
  id: string | null;
  client_id: string | null;
  project_title: string | null;
  deadline: string | null;
  location: string | null;
  contacts: ContactMethodsObject | null;
  hosting: string | null;
  satisfied: boolean | null;
  signage: string | null;
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
  hosting: string | null;
  satisfied: boolean;
  signage: string | null;
  contacts: ContactMethods | null;
  logos: Set<Image> | null;
  colors: Set<Color> | null;
  plan: string | null;

  constructor(data?: ProjectOnboardingObject) {
    this.id = data?.id ? data.id : null;
    this.clientID = data?.client_id ? data.client_id : null;
    this.projectTitle = data?.project_title ? data.project_title : null;
    this.deadline = data?.deadline ? data.deadline : null;
    this.location = data?.location ? data.location : null;
    this.hosting = data?.hosting ? data.hosting : null;
    this.satisfied = data?.satisfied ? data.satisfied : false;
    this.signage = data?.signage ? data.signage : null;
    this.contacts = data?.contacts ? new ContactMethods(data.contacts) : null;
    this.logos = data?.logos
      ? new Set(data.logos.map((logo) => new Image(logo)))
      : null;
    this.colors = data?.colors
      ? new Set(data.colors.map((color) => new Color(color)))
      : null;
    this.plan = data?.plan ? data.plan : null;
  }

  setID(id: string) {
    this.id = id;
  }

  setClientID(clientID: string) {
    this.clientID = clientID;
  }

  setProjectTitle(title: string) {
    this.projectTitle = title;
  }

  setDeadline(deadline: string) {
    this.deadline = deadline;
  }

  setLocation(location: string) {
    this.location = location;
  }

  setContacts(contacts: ContactMethods) {
    this.contacts = contacts;
  }

  setHosting(hosting: string) {
    this.hosting = hosting;
  }

  setSatisfied(satisfied: boolean) {
    this.satisfied = satisfied;
  }

  setSignage(signage: string) {
    this.signage = signage;
  }

  setLogos(logos: Set<Image>) {
    this.logos = logos;
  }

  setColors(colors: Set<Color>) {
    this.colors = colors;
  }

  setPlans(plans: string) {
    this.plan = this.plan;
  }

  toProjectOnboardingObject(): ProjectOnboardingObject {
    return {
      id: this.id,
      client_id: this.clientID,
      project_title: this.projectTitle,
      deadline: this.deadline,
      location: this.location,
      contacts: this.contacts ? this.contacts.toContactMethodsObject() : null,
      hosting: this.hosting,
      satisfied: this.satisfied,
      signage: this.signage,
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
