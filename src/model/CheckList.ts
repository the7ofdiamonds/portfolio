import { Model } from './Model';
import { Task, TaskDataObject, TaskObject } from './Task';

import { v4 as uuidv4 } from 'uuid';

export type CheckListObject = {
  id: string;
  title: string | null;
  tasks: Array<TaskObject>;
  weight: number;
};

export type CheckListDataObject = {
  id: string;
  title: string | null;
  tasks: Array<TaskDataObject>;
  weight: number;
};

export class CheckList extends Model {
  id: string;
  title: string | null;
  tasks: Set<Task>;
  weight: number;
  totalWeight: number;

  constructor(data: Record<string, any> | CheckListObject = {}) {
    super();

    this.id = data?.id ?? uuidv4();
    this.title = data?.title ?? null;

    if (data?.tasks && Array.isArray(data?.tasks)) {
      this.tasks = this.getTasks(data.tasks);
      this.weight = this.getWeight(data.tasks);
      this.totalWeight = this.getTotalWeight(data.tasks);
    } else {
      this.tasks = new Set<Task>();
      this.weight = 0;
      this.totalWeight = 0;
    }
  }

  setTitle(title: string) {
    this.title = title;
  }

  getTasks(data: Array<TaskObject>) {
    const tasks: Set<Task> = new Set();

    if (Array.isArray(data) && data.length > 0) {
      const taskArray = data.map((task) => new Task(task));

      taskArray.forEach((task) => {
        tasks.add(task);
      });
    }

    return tasks;
  }

  getWeight(data: Array<Record<string, any>> | Array<TaskObject>): number {
    if (!Array.isArray(data) || data.length === 0) return 0;

    let totalWeight = 0;

    data.forEach((task) => {
      if (task.status) {
        totalWeight += task.weight;
      }
    });

    return totalWeight;
  }

  getTotalWeight(data: Array<Record<string, any>> | Array<TaskObject>): number {
    if (!Array.isArray(data) || data.length === 0) return 0;

    let totalWeight = 0;

    data.forEach((task) => {
      totalWeight += task.weight;
    });

    return totalWeight;
  }

  setTotalWeight(tasks: Set<Task>) {
    let totalWeight = 0;

    tasks.forEach((task) => {
      totalWeight += task.weight;
    });

    this.totalWeight = totalWeight;
  }

  setTasks(tasks: Set<Task>) {
    this.tasks = tasks;

    this.setTotalWeight(tasks);
  }

  addTasks(tasks: Set<Task>) {
    this.tasks.union(tasks);

    this.setTotalWeight(this.tasks);
  }

  existsInSet(task: Task) {
    const map = new Map(Array.from(this.tasks).map((task) => [task.id, task]));

    return map.has(task.id);
  }

  toCheckListObject(): CheckListObject {
    const taskArray = Array.from(this.tasks);

    return {
      id: this.id,
      title: this.title,
      tasks: taskArray.map((task) => task.toTaskObject()),
      weight: this.weight,
    };
  }

  toCheckListDataObject(): CheckListDataObject {
    const taskArray = Array.from(this.tasks);

    return {
      id: this.id,
      title: this.title,
      tasks: taskArray.map((task) => task.toTaskObject()),
      weight: this.weight,
    };
  }
}
