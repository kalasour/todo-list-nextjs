export interface Task {
  id: number;
  type: TaskType;
  name: string;
  description: string;
  isDone: boolean;
}

export enum TaskType {
  High,
  Normal,
}

export const defaultTask: Task = {
  id: -1,
  type: TaskType.High,
  name: "",
  description: "",
  isDone: false,
};
