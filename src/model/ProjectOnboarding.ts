import { Color, ColorObject } from './Color';
import { ContactMethods, ContactMethodsObject } from './ContactMethods';
import { Gallery, GalleryObject } from './Gallery';

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
  images: GalleryObject | null;
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
  images: Gallery | null;
  colors: Set<Color> | null;
  plan: string | null;

  constructor(
    data?: ProjectOnboardingObject | Partial<ProjectOnboardingObject>
  ) {
    this.id = data?.id ? data.id : null;
    this.clientID = data?.client_id ? data.client_id : null;
    this.projectTitle = data?.project_title ? data.project_title : null;
    this.deadline = data?.deadline ? data.deadline : null;
    this.location = data?.location ? data.location : null;
    this.hosting = data?.hosting ? data.hosting : null;
    this.satisfied = data?.satisfied ? data.satisfied : false;
    this.signage = data?.signage ? data.signage : null;
    this.contacts = data?.contacts ? new ContactMethods(data.contacts) : null;
    this.images = data?.images ? new Gallery(data.images) : new Gallery();
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

  setImages(images: Gallery) {
    this.images = images;
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
      images:
        this.images?.images && this.images.images.length > 0
          ? this.images.toGalleryObject()
          : null,
      colors: this.colors
        ? Array.from(this.colors).map((color) => color.toColorObject())
        : null,
      plan: this.plan,
    };
  }
}
