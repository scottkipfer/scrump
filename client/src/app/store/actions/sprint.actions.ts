import { type } from '../../lib/utils';
import { Action } from '@ngrx/store';
import { Sprint, Task} from '../../models';

export const CREATE_SPRINT = type('[Sprint] Create Sprint');
export const CREATE_SPRINT_ERROR = type('[Sprint] Failed To Create Sprint');
export const CREATE_SPRINT_SUCCESS = type('[Sprint] Succesfully Created Sprint');
export const SPRINT_CREATED = type('[Sprint] Sprint Created');

export const LOAD_CURRENT_SPRINT = type('[Sprint] - Load Current Sprint');
export const LOAD_CURRENT_SPRINT_ERROR = type('[Sprint] - Failed to Load Current Sprint');
export const LOAD_CURRENT_SPRINT_SUCCESS = type('[Sprint] - Successfully Loaded Current Sprint');

export const TASK_ADDED_TO_SPRINT = type('[Sprint] - Task Added To Sprint');

export const UPDATE_SPRINT_TASK_POSITION = type('[Sprint] - Update Task Position');
export const UPDATE_SPRINT_TASK_POSITION_ERROR = type('[Sprint] - Failed to update task position');
export const UPDATE_SPRINT_TASK_POSITION_SUCCESS = type('[Sprint] - Successfully updated task position');
export const SPRINT_TASK_POSITION_UPDATED = type('[Sprint] - Task Position Updated');

export const CHANGE_TASK_STATUS = type('[Sprint] - Change Task Status');
export const CHANGE_TASK_STATUS_ERROR = type('[Sprint] - Failed to Change Task Status');
export const CHANGE_TASK_STATUS_SUCCESS = type('[Sprint] - Successfully Changed Task Status');
export const TASK_STATUS_CHANGED = type('[Sprint] - Task Status Changed');

export const LOAD_PAST_SPRINTS = type('[Sprint] - Load Past Sprints');
export const LOAD_PAST_SPRINTS_ERROR = type('[Sprint] - Failed to Load Past Sprints');
export const LOAD_PAST_SPRINTS_SUCCESS = type('[Sprint] - Successfully Loaded Past Sprints');

export const COMPLETE_SPRINT = type('[Sprint] - Complete Sprint');
export const COMPLETE_SPRINT_SUCCESS = type('[Sprint] - Successfully Completed Sprint');
export const COMPLETE_SPRINT_ERROR = type('[Sprint] - Failed to Complete Sprint');
export const SPRINT_COMPLETED = type('[Sprint] - Completed Sprint');

export const UPDATE_TASK_IN_SPRINT = type('[Sprint] - Update Task inside Sprint');

export class UpdateTaskInSprint implements Action {
  public type: string = UPDATE_TASK_IN_SPRINT;
  constructor(public payload: {task: Task, field: string}) {}
}

export class CreateSprint implements Action {
  public type: string = CREATE_SPRINT;
  constructor(public payload: Sprint) {}
}

export class CreateSprintError implements Action {
  public type: string = CREATE_SPRINT_ERROR;
  constructor(public payload: any) {}
}

export class CreateSprintSuccess implements Action {
  public type: string = CREATE_SPRINT_SUCCESS;
  constructor(public payload: Sprint) {}
}

export class SprintCreated implements Action {
  public type: string = SPRINT_CREATED;
  constructor(public payload: any) {}
}

export class LoadCurrentSprint implements Action {
  public type: string = LOAD_CURRENT_SPRINT;
  constructor(public payload: void) {}
}

export class LoadCurrentSprintError implements Action {
  public type: string = LOAD_CURRENT_SPRINT_ERROR;
  constructor(public payload: any) {}
}

export class LoadCurrentSprintSuccess implements Action {
  public type: string = LOAD_CURRENT_SPRINT_SUCCESS;
  constructor(public payload: Sprint) {}
}

export class TaskAddedToSprint implements Action {
  public type: string = TASK_ADDED_TO_SPRINT;
  constructor(public payload: Task) {}
}

export class UpdateSprintTaskPosition implements Action {
  public type: string = UPDATE_SPRINT_TASK_POSITION;
  constructor(public payload: any) {};
}

export class UpdateSprintTaskPositionError implements Action {
  public type: string = UPDATE_SPRINT_TASK_POSITION_ERROR;
  constructor(public payload: any) {};
}

export class UpdateSprintTaskPositionSuccess implements Action {
  public type: string = UPDATE_SPRINT_TASK_POSITION_SUCCESS;
  constructor(public payload: any) {};
}

export class SprintTaskPositionUpdated implements Action {
  public type: string = SPRINT_TASK_POSITION_UPDATED;
  constructor(public payload: { list: string, fromIndex: number, toIndex: number }) {};
}

export class ChangeTaskStatus implements Action {
  public type: string = CHANGE_TASK_STATUS;
  constructor(public payload: any) {};
}

export class ChangeTaskStatusError implements Action {
  public type: string = CHANGE_TASK_STATUS_ERROR;
  constructor(public payload: any) {};
}

export class ChangeTaskStatusSuccess implements Action {
  public type: string = CHANGE_TASK_STATUS_SUCCESS;
  constructor(public payload: any) {};
}

export class TaskStatusChanged implements Action {
  public type: string = TASK_STATUS_CHANGED;
  constructor(public payload: any) {};
}

export class LoadPastSprints implements Action {
  public type: string = LOAD_PAST_SPRINTS;
  constructor(public payload: any) {}
}

export class LoadPastSprintsError implements Action {
  public type: string = LOAD_PAST_SPRINTS_ERROR;
  constructor(public payload: any) {}
}

export class LoadPastSprintsSuccess implements Action {
  public type: string = LOAD_PAST_SPRINTS_SUCCESS;
  constructor(public payload: any) {}
}

export class CompleteSprint implements Action {
  public type: string = COMPLETE_SPRINT;
  constructor(public payload: any) {}
}

export class CompleteSprintError implements Action {
  public type: string = COMPLETE_SPRINT_ERROR;
  constructor(public payload: any) {}
}

export class CompleteSprintSuccess implements Action {
  public type: string = COMPLETE_SPRINT_SUCCESS;
  constructor(public payload: any) {}
}

export class SprintCompleted implements Action {
  public type: string = SPRINT_COMPLETED;
  constructor(public payload: any) {}
}

export type SprintActions = 
  | CreateSprint
  | CreateSprintError
  | CreateSprintSuccess
  | SprintCreated
  | LoadCurrentSprint
  | LoadCurrentSprintError
  | LoadCurrentSprintSuccess
  | TaskAddedToSprint
  | UpdateSprintTaskPosition
  | UpdateSprintTaskPositionError
  | UpdateSprintTaskPositionSuccess
  | SprintTaskPositionUpdated
  | ChangeTaskStatus
  | ChangeTaskStatusError
  | ChangeTaskStatusSuccess
  | TaskStatusChanged
  | LoadPastSprints
  | LoadPastSprintsError
  | LoadPastSprintsSuccess
  | CompleteSprint
  | CompleteSprintError
  | CompleteSprintSuccess
  | SprintCompleted
  | UpdateTaskInSprint;