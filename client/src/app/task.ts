import { Owner } from './owner'

export class Task {
  _id: string;
  sprintId?: string;
  board?: string;
  status: string;
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
};