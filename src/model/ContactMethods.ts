import { Contact, ContactObject } from './Contact';

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

export class ContactMethods {
  hackerRank: Contact;
  linkedin: Contact;
  x: Contact;
  instagram: Contact;
  github: Contact;
  youtube: Contact;
  website: Contact;
  email: Contact;
  phone: Contact;

  constructor(data?: ContactMethodsObject) {
    this.hackerRank = data?.hacker_rank
      ? new Contact(data?.hacker_rank)
      : this.setContact({
          id: 'hackerrank',
          title: 'Hacker Rank',
          type: 'url',
          url: '',
        });
    this.linkedin = data?.linked_in
      ? new Contact(data?.linked_in)
      : this.setContact({
          id: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          url: '',
        });
    this.x = data?.x
      ? new Contact(data?.x)
      : this.setContact({
          id: 'x',
          title: 'X',
          type: 'url',
          url: '',
        });
    this.instagram = data?.instagram
      ? new Contact(data?.instagram)
      : this.setContact({
          id: 'instagram',
          title: 'Instagram',
          type: 'url',
          url: '',
        });
    this.github = data?.github
      ? new Contact(data?.github)
      : this.setContact({
          id: 'github',
          title: 'GitHub',
          type: 'url',
          url: '',
        });
    this.youtube = data?.youtube
      ? new Contact(data?.youtube)
      : this.setContact({
          id: 'youtube',
          title: 'YouTube',
          type: 'url',
          url: '',
        });
    this.website = data?.website
      ? new Contact(data?.website)
      : this.setContact({
          id: 'website',
          title: 'Website',
          type: 'url',
          url: '',
        });
    this.email = data?.email
      ? new Contact(data?.email)
      : this.setContact({
          id: 'email',
          title: 'Email',
          type: 'email',
          value: '',
        });
    this.phone = data?.phone
      ? new Contact(data?.phone)
      : this.setContact({
          id: 'phone',
          title: 'Phone',
          type: 'tel',
          value: '',
        });
  }

  setContact(data: Partial<ContactObject>) {
    const contactObject: Partial<ContactObject> = {
      id: data?.id ?? '',
      title: data?.title ?? '',
      url: data?.url ?? '',
      value: data?.value ?? '',
      type: data?.type ?? 'text',
      class_name: data?.class_name ?? '',
      img_src: data?.img_src ?? '',
    };

    return new Contact(contactObject);
  }

  setContactHackerRank(url: string) {
    this.hackerRank.setURL(url);
    this.hackerRank.setClassName('fa-brands fa-hackerrank');
  }

  setContactLinkedIn(url: string) {
    this.linkedin.setURL(url);
    this.linkedin.setClassName('fa fa-linkedin fa-fw');
  }

  setContactX(url: string) {
    this.x.setURL(url);
    this.x.setClassName('fa-brands fa-x-twitter');
  }

  setContactInstagram(url: string) {
    this.instagram.setURL(url);
    this.instagram.setClassName('fa fa-instagram fa-fw');
  }

  setContactGitHub(url: string) {
    this.github.setURL(url);
    this.github.setClassName('fa fa-github fa-fw');
  }

  setContactYoutube(url: string) {
    this.youtube.setURL(url);
    this.youtube.setClassName('fa-brands fa-youtube');
  }

  setContactWebsite(url: string) {
    this.website.setURL(url);
    this.website.setClassName('fa-solid fa-globe');
  }

  setContactEmail(value: string) {
    this.email.setValue(value);
    this.email.setClassName('fa fa-envelope fa-fw');
  }

  setContactPhone(value: string) {
    this.phone.setValue(value);
    this.phone.setClassName('fa-solid fa-phone');
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
      hacker_rank:
        this.hackerRank && this.hackerRank.url
          ? this.hackerRank.toContactObject()
          : null,
      linked_in:
        this.linkedin && this.linkedin.url
          ? this.linkedin.toContactObject()
          : null,
      x: this.x && this.x.url ? this.x.toContactObject() : null,
      instagram:
        this.instagram && this.instagram.url
          ? this.instagram.toContactObject()
          : null,
      github:
        this.github && this.github.url ? this.github.toContactObject() : null,
      youtube:
        this.youtube && this.youtube.url
          ? this.youtube.toContactObject()
          : null,
      website:
        this.website && this.website.url
          ? this.website.toContactObject()
          : null,
      email:
        this.email && this.email.value ? this.email.toContactObject() : null,
      phone:
        this.phone && this.phone.value ? this.phone.toContactObject() : null,
    };
  }
}
