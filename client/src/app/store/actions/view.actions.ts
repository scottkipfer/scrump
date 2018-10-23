import {Action} from '@ngrx/store';
import {type} from '../../lib/utils';

export const UPDATE_VIEW = type('[View] Update View');

export class UpdateView implements Action {
  public type: string = UPDATE_VIEW;
  constructor(public payload: string) {}
}

export type ViewActions =
  | UpdateView;
