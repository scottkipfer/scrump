import { Action } from '@ngrx/store';
import { type } from '../../lib/utils';
import { Task } from '../../models';

export const CREATE_TASK = type('[Task] Create Task');
export const CREATE_TASK_ERROR = type('[Task] Create Task Error');
export const CREATE_TASK_SUCCESS = type('[Task] Create Task Success');
export const GET_TASKS_BY_BOARD = type('[Task] Get Tasks By Board Name');
export const GET_TASKS_BY_BOARD_ERROR = type('[Task] Failed to Get Tasks By Board Name');
export const GET_TASKS_BY_BOARD_SUCCESS = type('[Task] Successfully Retrieved Tasks By Board Name');

export class CreateTask implements Action {
  public type: string = CREATE_TASK;
  constructor(public payload: Task) {}
}

export class CreateTaskError implements Action {
  public type: string = CREATE_TASK_ERROR;
  constructor(public payload: any) {}
}

export class CreateTaskSuccess implements Action {
  public type: string = CREATE_TASK_SUCCESS;
  constructor(public payload: Task) {}
}

export class GetTasksByBoard implements Action {
  public type: string  = GET_TASKS_BY_BOARD;
  constructor(public payload: string) {}
}
export class GetTasksByBoardError implements Action {
  public type: string  = GET_TASKS_BY_BOARD_ERROR;
  constructor(public payload: any) {}
}
export class GetTasksByBoardSuccess implements Action {
  public type: string  = GET_TASKS_BY_BOARD_SUCCESS;
  constructor(public payload: Task[]) {}
}

export type TaskActions =
  | CreateTask
  | CreateTaskError
  | CreateTaskSuccess
  | GetTasksByBoard
  | GetTasksByBoardError
  | GetTasksByBoardSuccess;
