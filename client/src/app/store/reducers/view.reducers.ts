import * as viewActions from '../actions/view.actions';

export interface ViewState {
  currentView: string,
  editing: boolean,
}

const initialState: ViewState = {
  currentView: '',
  editing: false
};

export function reducer(state: ViewState = initialState, action: viewActions.ViewActions): ViewState {
  switch (action.type) {
    case viewActions.UPDATE_VIEW:
      return {
        ...state,
        currentView: action.payload
      };

    case viewActions.START_EDIT:
      return {
        ...state,
        editing: true
      }
    case viewActions.FINISH_EDIT:
      return {
        ...state,
        editing: false
      };
    default: return state;
  }
}

export const getCurrentView = (state: ViewState) => state.currentView;
export const isEditing = (state: ViewState) => state.editing;
