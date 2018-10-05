import { Owner } from './owner'

export class Task {
  id: string;
  summary: string;
  requirementUrl: string;
  fe: Owner;
  api: Owner;
  devOps: Owner;
  email: Owner;
  qe: Owner;
  eta: Date;
  deployed: Date;
  deadline: Date;
  notes: string;
};