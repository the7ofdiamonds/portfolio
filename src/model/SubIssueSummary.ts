export interface SubIssueSummaryObject {
  completed: number;
  percent_completed: number;
  total: number;
}

export class SubIssueSummary {
  completed: number;
  percentCompleted: number;
  total: number;

  constructor(data: SubIssueSummaryObject) {
    this.completed = data.completed;
    this.percentCompleted = data.percent_completed;
    this.total = data.total;
  }

  toSubIssueSummaryObject(): SubIssueSummaryObject {
    return {
      completed: this.completed,
      percent_completed: this.percentCompleted,
      total: this.total,
    };
  }
}