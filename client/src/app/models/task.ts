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
}

export class CreateTaskModel {
  board?: string;
  sprint?: string;
  task: Task;
}
