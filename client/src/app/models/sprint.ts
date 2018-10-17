import { Task } from '.'

export class Sprint {
  _id?: string;
  name?: string;
  inProgress?: Task[];
  notStarted?: Task[];
  onHold?: Task[];
  cancelled?: Task[];
  completed?: Task[];
}
