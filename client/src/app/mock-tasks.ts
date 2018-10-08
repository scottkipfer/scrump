import { Task } from './task';
import { Owner } from './owner';

export const TASKS: Task[] = [
  {
    id: '1',
    sprintId: 'banana',
    status: 'Not Started',
    summary: 'Ability to remove all images on product pages',
    requirementUrl: 'https://www.pivotaltracker.com/n/projects/944328/stories/156665519',
    fe: new Owner('1', 'RZ', 'wip'),
    api: null,
    devOps: null,
    email: null,
    qe: null,
    eta: null,
    deployed: null,
    deadline: null,
    notes: 'some note here'
  },
  {
    id: '90',
    sprintId: 'banana',
    status: 'Not Started',
    summary: 'Prune all css files from everywhere',
    requirementUrl: 'https://www.pivotaltracker.com/n/projects/944328/stories/156665519',
    fe: null,
    api: null,
    devOps: null,
    email: null,
    qe: null,
    eta: null,
    deployed: null,
    deadline: null,
    notes: ''
  },
  {
    id: '89',
    sprintId: 'banana',
    status: 'In Progress',
    summary: 'Destroy all brown bananas',
    requirementUrl: 'https://www.pivotaltracker.com/n/projects/944328/stories/156665519',
    fe: new Owner('17', 'KE', 'ns'),
    api: null,
    devOps: null,
    email: null,
    qe: null,
    eta: null,
    deployed: null,
    deadline: null,
    notes: ''
  }
];
