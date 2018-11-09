import {Action} from '@ngrx/store';
import {type} from '../../lib/utils';

export const UPDATE_VIEW = type('[View] Update View');
export const START_EDIT = type('[View] Start Edit');
export const FINISH_EDIT = type('[View] Finish Edit');
export const REFRESH_VIEW = type('[View] Refresh View');
export const SHOW_OVERLAY = type('[View] Show Overlay')
export const HIDE_OVERLAY = type('[View] Hide Overlay')

export class UpdateView implements Action {
  public type: string = UPDATE_VIEW;
  constructor(public payload: string) {}
}

export class RefreshView implements Action {
  public type: string = REFRESH_VIEW;
  constructor(public payload: string) {}
}

export class StartEdit implements Action {
  public type: string = START_EDIT;
  constructor(public payload: null) {}
}

export class FinishEdit implements Action {
  public type: string = FINISH_EDIT;
  constructor(public payload: any) {}
}

export class ShowOverlay implements Action {
  public type: string = SHOW_OVERLAY;
  constructor(public payload: any) {}
}

export class HideOverlay implements Action {
  public type: string = HIDE_OVERLAY;
  constructor(public payload: any) {}
}

export type ViewActions =
  | UpdateView
  | StartEdit
  | FinishEdit
  | RefreshView
  | ShowOverlay
  | HideOverlay;
