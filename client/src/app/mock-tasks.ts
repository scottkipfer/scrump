import { Task, Owner } from './models';

export const TASKS: Task[] = [
  {
    _id: '1',
    summary: 'Ability to remove all images on product pages',
    requirementUrl: 'https://www.pivotaltracker.com/n/projects/944328/stories/156665519',
    fe: new Owner('RZ', 'wip'),
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
    _id: '90',
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
    _id: '89',
    summary: 'Destroy all brown bananas',
    requirementUrl: 'https://www.pivotaltracker.com/n/projects/944328/stories/156665519',
    fe: new Owner('KE', 'ns'),
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
