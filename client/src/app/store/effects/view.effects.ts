import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as sprintActions from '../actions/sprint.actions';
import * as boardActions from '../actions/board.actions';
import * as viewActions from '../actions/view.actions';
import { SocketService } from '../../services/socket/socket.service';
import { of } from 'rxjs';
import {map, filter, switchMap, catchError, tap, withLatestFrom} from 'rxjs/operators';
import { getCurrentView } from '../selectors';

@Injectable()
export class ViewEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private store$: Store<fromStore.AppState>
  ) {}

  @Effect()
  connectedToSocket$ = this.socketService.connectedObs$.pipe(
    filter(val => val === true),
    withLatestFrom(this.store$.select(getCurrentView)),
    switchMap(([_, currentView]) => {
      return [
        (new viewActions.HideOverlay(null)), 
        currentView === 'current' ?
        (new sprintActions.LoadCurrentSprint(null)) :
        (new boardActions.LoadBoard(currentView))]
    })
  )

  @Effect()
  disconnectedToSocket$ = this.socketService.connectedObs$.pipe(
    filter(val => val === false),
    switchMap(_ => of(new viewActions.ShowOverlay(null)))
  )

}
