import { Model } from './Model';
import { ProjectCheckList, ProjectCheckListObject } from './ProjectCheckList';

export type ProjectProgressObject = {
  completion: number;
};

export class ProjectProgress extends Model {
  completion: number;

  constructor(data?: ProjectCheckList | number) {
    super();

    this.completion =
      data instanceof ProjectCheckList
        ? this.getCompletion(data)
        : typeof data === 'number'
        ? data
        : 0;
  }

  getCompletion(projectCheckList: ProjectCheckList) {
    let percentageComplete = 0;

    const totalWeight = projectCheckList.totalWeight;

    if (totalWeight > 0) {
      percentageComplete =
        (((projectCheckList.designCheckList
          ? projectCheckList.designCheckList.weight
          : 0) +
          (projectCheckList.developmentCheckList
            ? projectCheckList.developmentCheckList.weight
            : 0) +
          (projectCheckList.deliveryCheckList
            ? projectCheckList.deliveryCheckList.weight
            : 0)) /
          totalWeight) *
        100;
    }

    return percentageComplete;
  }

  toProjectProgressObject(): ProjectProgressObject {
    return {
      completion: this.completion,
    };
  }
}