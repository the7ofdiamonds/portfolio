import { Model } from './Model';
import { Contact, ContactObject } from './Contact';
import { Image } from './Image';

export interface ContactMethodsObject {
  hacker_rank: ContactObject | null;
  linked_in: ContactObject | null;
  x: ContactObject | null;
  instagram: ContactObject | null;
  github: ContactObject | null;
  youtube: ContactObject | null;
  website: ContactObject | null;
  email: ContactObject | null;
  phone: ContactObject | null;
}

export class ContactMethods extends Model {
  hackerRank: Contact | null;
  linkedin: Contact | null;
  x: Contact | null;
  instagram: Contact | null;
  github: Contact | null;
  youtube: Contact | null;
  website: Contact | null;
  email: Contact | null;
  phone: Contact | null;

  constructor(data?: ContactMethodsObject) {
    super();

    this.hackerRank = data?.hacker_rank ? new Contact(data?.hacker_rank) : null;
    this.linkedin = data?.linked_in ? new Contact(data?.linked_in) : null;
    this.x = data?.x ? new Contact(data?.x) : null;
    this.instagram = data?.instagram ? new Contact(data?.instagram) : null;
    this.github = data?.github ? new Contact(data?.github) : null;
    this.youtube = data?.youtube ? new Contact(data?.youtube) : null;
    this.website = data?.website ? new Contact(data?.website) : null;
    this.email = data?.email ? new Contact(data?.email) : null;
    this.phone = data?.phone ? new Contact(data?.phone) : null;
  }

  setContact(data: Record<string, any>) {
    const id = data?.id ?? '';
    const title = data?.title ?? '';
    const url = data?.url ?? '';
    const image = data?.image
      ? new Image(data.image)
      : new Image({
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9oOKlwAAAABJRU5ErkJggg==',
        });
    const value = data?.value ?? '';

    const contactObject: ContactObject = {
      id: id,
      title: title,
      url: url,
      image: image.toImageObject(),
      value: value,
    };

    return new Contact(contactObject);
  }

  setContactHackerRank(url: string) {
    const id = 'hackerrank';
    const title = 'Hacker Rank';
    const className = 'fa-brands fa-hackerrank';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.hackerRank = this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
      value: '',
    });
  }

  setContactLinkedIn(url: string) {
    const id = 'linkedIn';
    const title = 'LinkedIn';
    const className = 'fa fa-linkedin fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.linkedin = this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
      value: '',
    });
  }

  setContactX(url: string) {
    const id = 'x';
    const title = 'X';
    const className = 'fa-brands fa-x-twitter';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.x = this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
      value: '',
    });
  }

  setContactInstagram(url: string) {
    const id = 'instagram';
    const title = 'Instagram';
    const className = 'fa fa-instagram fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.instagram = this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
      value: '',
    });
  }

  setContactGitHub(url: string) {
    const id = 'gitHub';
    const title = 'GitHub';
    const className = 'fa fa-github fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.github = this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
      value: '',
    });
  }

  setContactYoutube(url: string) {
    const id = 'youtube';
    const title = 'YouTube';
    const className = 'fa-brands fa-youtube';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.youtube = this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
      value: '',
    });
  }

  setContactWebsite(value: string) {
    const id = 'website';
    const title = 'Website';
    const className = 'fa-solid fa-globe';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.website = this.setContact({
      id: id,
      title: title,
      image: image,
      url: '',
      value: value,
    });
  }

  setContactEmail(value: string) {
    const id = 'email';
    const title = 'Email';
    const className = 'fa fa-envelope fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.email = this.setContact({
      id: id,
      title: title,
      image: image,
      url: '',
      value: value,
    });
  }

  setContactPhone(value: string) {
    const id = 'phone';
    const title = 'Phone';
    const className = 'fa-solid fa-phone';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: '',
    }).toObject();

    this.phone = this.setContact({
      id: id,
      title: title,
      image: image,
      url: '',
      value: value,
    });
  }

  fromGitHub(data: Array<Record<string, any>>) {
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((contact) => {
        try {
          if (!contact?.url) return;

          const url = new URL(contact.url);

          if (url.host === 'www.hackerrank.com') {
            this.setContactHackerRank(url.href);
          }

          if (url.host === 'www.linkedin.com') {
            this.setContactLinkedIn(url.href);
          }

          if (url.host === 'x.com') {
            this.setContactX(url.href);
          }

          if (url.host === 'www.instagram.com') {
            this.setContactInstagram(url.href);
          }
        } catch (error) {
          console.error(`Invalid URL: ${contact.url}`, error);
        }
      });
    }
  }

  fromDB(data: Record<string, any>) {
    if (data?.id === 'email') {
      this.setContactEmail(data.value);
    }

    if (data?.id === 'phone') {
      this.setContactPhone(data.value);
    }
  }

  toContactMethodsObject(): ContactMethodsObject {
    return {
      hacker_rank: this.hackerRank ? this.hackerRank.toContactObject() : null,
      linked_in: this.linkedin ? this.linkedin.toContactObject() : null,
      x: this.x ? this.x.toContactObject() : null,
      instagram: this.instagram ? this.instagram.toContactObject() : null,
      github: this.github ? this.github.toContactObject() : null,
      youtube: this.youtube ? this.youtube.toContactObject() : null,
      website: this.website ? this.website.toContactObject() : null,
      email: this.email ? this.email.toContactObject() : null,
      phone: this.phone ? this.phone.toContactObject() : null,
    };
  }
}
