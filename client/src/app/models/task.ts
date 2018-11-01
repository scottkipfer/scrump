import { Owner } from './owner'

export class Task {
  _id: string;
  summary: string;
  requirementUrl?: string;
  fe?: Owner;
  api?: Owner;
  devOps?: Owner;
  email?: Owner;
  qe?: Owner;
  eta?: Date;
  deployed?: Date;
  deadline?: Date;
  notes?: string;
  board?: string;
  justUpdated?: boolean;
  justRemoved?: boolean;
  justUpdatedField?: string;
}

export class CreateTaskModel {
  board?: string;
  sprint?: string;
  task: Task;

  constructor() {
    this.task = new Task();
  }
}
