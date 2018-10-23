import * as viewActions from '../actions/view.actions';

export interface ViewState {
  currentView: string 
}


const initialState: ViewState = {
  currentView: ''
};

export function reducer (state: ViewState = initialState, action: viewActions.ViewActions): ViewState {
 switch (action.type) {

   case viewActions.UPDATE_VIEW:
     return {
       ...state,
       currentView: action.payload
     };
   default: return state;
 }
}

export const getCurrentView = (state: ViewState) => state.currentView;
