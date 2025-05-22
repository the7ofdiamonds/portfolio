import {Model} from './Model';
import {
  ProjectDesign,
  ProjectDesignDataObject,
  ProjectDesignObject,
} from './ProjectDesign';
import {
  ProjectDevelopment,
  ProjectDevelopmentDataObject,
  ProjectDevelopmentObject,
} from './ProjectDevelopment';
import {
  ProjectDelivery,
  ProjectDeliveryDataObject,
  ProjectDeliveryObject,
} from './ProjectDelivery';
import { ProjectStatus,ProjectStatusObject } from './ProjectStatus';
import {ProjectProgress} from './ProjectProgress';
import { ProjectCheckList,ProjectCheckListObject } from './ProjectCheckList';
import { ProjectDataObject } from './Project';
import {Repo} from './Repo';

export type ProjectProcessObject = {
  status: ProjectStatusObject | null;
  design: ProjectDesignObject | null;
  development: ProjectDevelopmentObject | null;
  delivery: ProjectDeliveryObject | null;
};

export type ProjectProcessDataObject = {
  status: ProjectStatusObject | null;
  design: ProjectDesignDataObject | null;
  development: ProjectDevelopmentDataObject | null;
  delivery: ProjectDeliveryDataObject | null;
};

export class ProjectProcess extends Model {
  design: ProjectDesign | null;
  development: ProjectDevelopment | null;
  delivery: ProjectDelivery | null;
  status: ProjectStatus | null;
  checkList: ProjectCheckList | null;

  constructor(data?: ProjectProcessObject) {
    super();

    this.design = data?.design ? new ProjectDesign(data.design) : null;
    this.development = data?.development
      ? new ProjectDevelopment(data.development)
      : null;
    this.delivery = data?.delivery ? new ProjectDelivery(data.delivery) : null;

    const projectCheckListObject: ProjectCheckListObject = {
      design_check_list:
        this.design && this.design.checkList
          ? this.design.checkList.toCheckListObject()
          : null,
      development_check_list:
        this.development && this.development.checkList
          ? this.development.checkList.toCheckListObject()
          : null,
      delivery_check_list:
        this.delivery && this.delivery.checkList
          ? this.delivery.checkList.toCheckListObject()
          : null,
    };

    this.checkList =
      projectCheckListObject.design_check_list ||
      projectCheckListObject.development_check_list ||
      projectCheckListObject.delivery_check_list
        ? new ProjectCheckList(projectCheckListObject)
        : null;

    const progress = this.checkList
      ? new ProjectProgress(this.checkList)
      : null;

    this.status =
      data?.status && progress
        ? new ProjectStatus(data?.status, progress)
        : null;
  }

  setStatus(status: ProjectStatus) {
    this.status = status;
  }

  setDesign(design: ProjectDesign) {
    this.design = design;
  }

  setDevelopment(development: ProjectDevelopment) {
    this.development = development;
  }

  setDelivery(delivery: ProjectDelivery) {
    this.delivery = delivery;
  }

  fromRepo(repo: Repo) {
    let status = null;
    let design = null;
    let development = null;
    let delivery = null;

    if (repo.createdAt || repo.updatedAt) {
      status = new ProjectStatus();
      status.fromRepo(repo);
    }

    if (repo.contents?.design || repo.issues?.design) {
      design = new ProjectDesign();
      design.fromRepo(repo);
    }

    if (repo.contents?.development || repo.skills || repo.repoURL) {
      development = new ProjectDevelopment();
      development.fromRepo(repo);
    }

    if (repo.contents?.delivery) {
      delivery = new ProjectDelivery();
      delivery.fromRepo(repo);
    }

    status ? this.setStatus(status) : null;
    design ? this.setDesign(design) : null;
    development ? this.setDevelopment(development) : null;
    delivery ? this.setDelivery(delivery) : null;
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.process) {
      if (data.process?.status) {
        this.status ? this.status : (this.status = new ProjectStatus());
        this.status.fromDocumentData(data);
      }

      if (data.process.design) {
        this.design ? this.design : (this.design = new ProjectDesign());
        this.design.fromDocumentData(data);
      }

      if (data.process?.development) {
        this.development
          ? this.development
          : (this.development = new ProjectDevelopment());
        this.development.fromDocumentData(data);
      }

      if (data.process?.delivery) {
        this.delivery ? this.delivery : (this.delivery = new ProjectDelivery());
        this.delivery.fromDocumentData(data);
      }
    }
  }

  toProjectProcessObject(): ProjectProcessObject {
    return {
      status: this.status ? this.status.toProjectStatusObject() : null,
      design: this.design ? this.design.toProjectDesignObject() : null,
      development: this.development
        ? this.development.toProjectDevelopmentObject()
        : null,
      delivery: this.delivery ? this.delivery.toProjectDeliveryObject() : null,
    };
  }

  toProjectProcessDataObject(): ProjectProcessDataObject {
    return {
      status: this.status ? this.status.toProjectStatusObject() : null,
      design: this.design ? this.design.toProjectDesignDataObject() : null,
      development: this.development
        ? this.development.toProjectDevelopmentDataObject()
        : null,
      delivery: this.delivery
        ? this.delivery.toProjectDeliveryDataObject()
        : null,
    };
  }
}