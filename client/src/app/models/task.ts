import { Owner } from './owner'

export class Task {
  _id: string;
  sprintId?: string;
  board?: string;
  status: string;   // valid values: 'Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'
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

  constructor() {
    this.status = 'Not Started';
  }

}
