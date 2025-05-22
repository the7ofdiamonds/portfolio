import { CheckList, CheckListObject } from './CheckList';
import { Model } from './Model';

export type ProjectCheckListObject = {
  design_check_list: CheckListObject | null;
  development_check_list: CheckListObject | null;
  delivery_check_list: CheckListObject | null;
};

export class ProjectCheckList extends Model {
  designCheckList: CheckList | null;
  developmentCheckList: CheckList | null;
  deliveryCheckList: CheckList | null;
  totalWeight: number;

  constructor(data?: ProjectCheckListObject) {
    super();

    this.designCheckList = data?.design_check_list
      ? new CheckList(data.design_check_list)
      : null;
    this.developmentCheckList = data?.development_check_list
      ? new CheckList(data.development_check_list)
      : null;
    this.deliveryCheckList = data?.delivery_check_list
      ? new CheckList(data.delivery_check_list)
      : null;
    this.totalWeight = this.getTotalWeight();
  }

  setDesignCheckList(checkList: CheckList) {
    this.designCheckList = checkList;
  }

  setDevelopmentCheckList(checkList: CheckList) {
    this.developmentCheckList = checkList;
  }

  setDeliveryCheckList(checkList: CheckList) {
    this.deliveryCheckList = checkList;
  }

  getTotalWeight(): number {
    return (
      (this.designCheckList ? this.designCheckList.totalWeight : 0) +
      (this.developmentCheckList ? this.developmentCheckList.totalWeight : 0) +
      (this.deliveryCheckList ? this.deliveryCheckList.totalWeight : 0)
    );
  }

  toProjectCheckListObject(): ProjectCheckListObject {
    return {
      design_check_list: this.designCheckList
        ? this.designCheckList.toCheckListObject()
        : null,
      development_check_list: this.developmentCheckList
        ? this.developmentCheckList.toCheckListObject()
        : null,
      delivery_check_list: this.deliveryCheckList
        ? this.deliveryCheckList.toCheckListObject()
        : null,
    };
  }
}