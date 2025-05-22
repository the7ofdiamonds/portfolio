import { Model } from './Model';
import {
  Organization,
  OrganizationGQL,
  OrganizationObject,
} from './Organization';

export type OrganizationsGQL = {
  nodes: Array<OrganizationGQL>;
};

export class Organizations extends Model {
  list: Array<Organization>;
  count: number;

  constructor(data?: Array<OrganizationObject>) {
    super();

    let organizations: Array<Organization> = [];

    if (Array.isArray(data) && data.length > 0) {
      data.map((organization) => {
        organizations.push(new Organization(organization));
      });
    }

    this.list = organizations;
    this.count = organizations.length;
  }

  fromGitHubGraphQL(organizations: OrganizationsGQL) {
    if (Array.isArray(organizations) && organizations.length > 0) {
      this.list = organizations.map((organization) => {
        const org = new Organization();
        org.fromGitHubGraphQL(organization);
        return org;
      });
    }
  }
}