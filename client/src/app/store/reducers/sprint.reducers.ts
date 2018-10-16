import { Sprint } from '../../models/sprint';
import * as sprintActions from '../actions/sprint.actions';
import { SprintState } from './sprint.reducers';

export interface SprintState {
  loaded: boolean;
  loading: boolean;
  currentSprint?: Sprint;
  error?: any;
}

const initialState: SprintState = {
  loaded: false,
  loading: false
};

export function reducer(state: SprintState = initialState, action: sprintActions.SprintActions): SprintState {
  switch(action.type) {
    case sprintActions.CREATE_SPRINT_ERROR:
      return {
        ...state,
        error: action.payload.error
      }

    case sprintActions.LOAD_CURRENT_SPRINT:
      return {
        ...state,
        loaded: false,
        loading: true
      }

    case sprintActions.LOAD_CURRENT_SPRINT_ERROR:
      return {
        ...state,
        error: action.payload.error
      }

    case sprintActions.LOAD_CURRENT_SPRINT_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        currentSprint: action.payload
      }

    case sprintActions.CREATE_SPRINT_SUCCESS:
    case sprintActions.CREATE_SPRINT:
    default: return state;
  };

}

export  const getCurrentSprint = (state: SprintState) => state.currentSprint;


