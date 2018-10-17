import {TaskEffects} from './task.effects';
import {BoardEffects} from './board.effects';
import {SprintEffects} from './sprint.effects';

export const effects: any[] = [
  TaskEffects,
  BoardEffects,
  SprintEffects
];

export * from './task.effects';
export * from './board.effects';
export * from './sprint.effects';
