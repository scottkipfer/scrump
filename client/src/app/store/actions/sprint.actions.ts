import { type } from '../../lib/utils';
import { Action } from '@ngrx/store';
import { Sprint } from '../../models';

export const CREATE_SPRINT = type('[Sprint] Create Sprint');
export const CREATE_SPRINT_ERROR = type('[Sprint] Failed To Create Sprint');
export const CREATE_SPRINT_SUCCESS = type('[Sprint] Succesfully Created Sprint');
export const SPRINT_CREATED = type('[Sprint] Sprint Created');

export const LOAD_CURRENT_SPRINT = type('[Sprint] - Load Current Sprint');
export const LOAD_CURRENT_SPRINT_ERROR = type('[Sprint] - Failed to Load Current Sprint');
export const LOAD_CURRENT_SPRINT_SUCCESS = type('[Sprint] - Successfully Loaded Current Sprint');


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
  
export type SprintActions = 
  | CreateSprint
  | CreateSprintError
  | CreateSprintSuccess
  | SprintCreated
  | LoadCurrentSprint
  | LoadCurrentSprintError
  | LoadCurrentSprintSuccess;