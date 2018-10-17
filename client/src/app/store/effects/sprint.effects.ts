import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import {map, switchMap, catchError, tap, withLatestFrom} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as sprintActions from '../actions/sprint.actions';
import { SprintService } from '../../services/sprint/sprint.service';
import { SocketService } from '../../services/socket/socket.service';
import { Sprint } from '../../models';

@Injectable()
export class SprintEffects {

  constructor(
    private actions$: Actions,
    private sprintService: SprintService,
    private socketService: SocketService,
    // private store$: Store<fromStore:AppState>
  ) {}

  @Effect()
  loadCurrentSprint$ = this.actions$
    .ofType(sprintActions.LOAD_CURRENT_SPRINT).pipe(
      map((action: sprintActions.LoadCurrentSprint) => action.payload),
      switchMap((sprint: Sprint) => {
        return this.sprintService.getCurrentSprint()
        .pipe(
          map((sprint: Sprint) => new sprintActions.LoadCurrentSprintSuccess(sprint)),
          catchError(error => of(new sprintActions.LoadCurrentSprintError({error: error})))
        )
      })
    )


  @Effect()
  createSprint$ = this.actions$
    .ofType(sprintActions.CREATE_SPRINT).pipe(
      map((action: sprintActions.CreateSprint) =>
      action.payload),
      switchMap((sprint: Sprint) => {
        return this.sprintService.createSprint(sprint).pipe(
          map((sprint: Sprint) => new sprintActions.CreateSprintSuccess(sprint),
          catchError(error => of(new sprintActions.CreateSprintError({error: error})))
          )
        )
      })
    )

  @Effect()
  sprintCreated$ = this.socketService.sprintCreated$.pipe(
    switchMap(sprint => of(new sprintActions.SprintCreated(sprint)))
  )
 
  @Effect()
  taskAddedToSprint$ = this.socketService.taskAddedToSprint$.pipe(
    switchMap(task => of(new sprintActions.TaskAddedToSprint(task)).pipe(
      map(() => new sprintActions.LoadCurrentSprint(null)))
    )
  )
}
