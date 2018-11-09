import {TaskEffects} from './task.effects';
import {BoardEffects} from './board.effects';
import {SprintEffects} from './sprint.effects';
import {ViewEffects} from './view.effects';

export const effects: any[] = [
  TaskEffects,
  BoardEffects,
  SprintEffects,
  ViewEffects
];

export * from './task.effects';
export * from './board.effects';
export * from './sprint.effects';
export * from './view.effects';
