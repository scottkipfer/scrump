import { Action } from '@ngrx/store';
import { type } from '../../lib/utils';
import { Task, CreateTaskModel } from '../../models';

export const CREATE_TASK = type('[Task] Create Task');
export const CREATE_TASK_ERROR = type('[Task] Create Task Error');
export const CREATE_TASK_SUCCESS = type('[Task] Create Task Success');
export const TASK_CREATED = type('[Task] Task was Created Event');

export const UPDATE_TASK = type('[Task] Update Task')
export const UPDATE_TASK_ERROR = type('[Task] Task failed to update');
export const UPDATE_TASK_SUCCESS = type('[Task] Task successfully updated');
export const TASK_UPDATED = type('[Task] Task was updated');

export const SWITCH_BOARDS = type('[Task] Switch Boards');
export const SWITCH_BOARDS_BULK = type('[Task] Switch Boards Bulk');
export const SWITCH_BOARDS_ERROR = type('[Task] Switch Boards Failed');
export const SWITCH_BOARDS_SUCCESS = type('[Task] Switching Boards Succeeded');

export const SELECT_TASK = type('[Task] - Select Task');
export const UNSELECT_TASK = type('[Task] - Unselect Task');
export const SELECT_ALL_TASKS = type('[Task] - Select All Tasks');
export const UNSELECT_ALL_TASKS = type('[Task] - Unselect All Tasks');
export const UNSELECT_MULTIPLE_TASKS = type('[Task] - Unselect Multiple Tasks');

export class TaskCreated implements Action {
  public type: string = TASK_CREATED;
  constructor(public payload: Task) {}
}

export class CreateTask implements Action {
  public type: string = CREATE_TASK;
  constructor(public payload: CreateTaskModel) {}
}

export class CreateTaskError implements Action {
  public type: string = CREATE_TASK_ERROR;
  constructor(public payload: any) {}
}

export class CreateTaskSuccess implements Action {
  public type: string = CREATE_TASK_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateTask implements Action {
  public type: string = UPDATE_TASK;
  constructor(public payload: {task:Task, field: string, value: any}) {}
}

export class UpdateTaskError implements Action {
  public type: string = UPDATE_TASK_ERROR;
  constructor(public payload: any) {}
}

export class UpdateTaskSuccess implements Action {
  public type: string = UPDATE_TASK_SUCCESS;
  constructor(public payload: any) {}
}

export class TaskUpdated implements Action {
  public type: string = TASK_UPDATED;
  constructor(public payload: {task: Task, field: string}) {}
}

export class SwitchBoards implements Action {
  public type: string = SWITCH_BOARDS;
  constructor(public payload: any) {}
}

export class SwitchBoardsBulk implements Action {
  public type: string = SWITCH_BOARDS_BULK;
  constructor(public payload: any) {}
}

export class SwitchBoardsError implements Action {
  public type: string = SWITCH_BOARDS_ERROR;
  constructor(public payload: any) {}
}

export class SwitchBoardsSuccess implements Action {
  public type: string = SWITCH_BOARDS_SUCCESS;
  constructor(public payload: any) {}
}

export class SelectTask implements Action {
  public type: string = SELECT_TASK;
  constructor(public payload: Task) {}
}

export class UnselectTask implements Action {
  public type: string = UNSELECT_TASK;
  constructor(public payload: Task) {}
}

export class SelectAllTasks implements Action {
  public type: string = SELECT_ALL_TASKS;
  constructor(public payload: any) {}
}

export class UnselectMultipleTasks implements Action {
  public type: string = UNSELECT_MULTIPLE_TASKS;
  constructor(public payload: any) {}
}

export class UnselectAllTasks implements Action {
  public type: string = UNSELECT_ALL_TASKS;
  constructor(public payload: any) {}
}

export type TaskActions =
  | CreateTask
  | CreateTaskError
  | CreateTaskSuccess
  | UpdateTask
  | UpdateTaskError
  | UpdateTaskSuccess
  | SwitchBoards
  | SwitchBoardsBulk
  | SwitchBoardsError
  | SwitchBoardsSuccess
  | SelectTask
  | SelectAllTasks
  | UnselectTask
  | UnselectAllTasks
  | UnselectMultipleTasks;
