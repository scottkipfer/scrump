import { Task } from './';

export class Board {
  _id?: string;
  name: string;
  tasks: Task[];
  created: Date;
  updated: Date;
}
