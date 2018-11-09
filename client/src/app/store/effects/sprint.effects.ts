import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import {map, switchMap, catchError, tap, withLatestFrom} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as sprintActions from '../actions/sprint.actions';
import * as taskActions from '../actions/task.actions';
import * as boardActions from '../actions/board.actions';
import { SprintService } from '../../services/sprint/sprint.service';
import { SocketService } from '../../services/socket/socket.service';
import { Sprint } from '../../models';
import {getBoard} from '../../store/selectors/board.selectors';

@Injectable()
export class SprintEffects {

  constructor(
    private actions$: Actions,
    private sprintService: SprintService,
    private socketService: SocketService,
    private store$: Store<fromStore.AppState>
  ) {}

  @Effect()
  loadCurrentSprint$ = this.actions$
    .ofType(sprintActions.LOAD_CURRENT_SPRINT).pipe(
      map((action: sprintActions.LoadCurrentSprint) => action.payload),
      switchMap((sprint: Sprint) => {
        return this.sprintService.getCurrentSprint()
        .pipe(
          switchMap((sprint: Sprint) => [
            new sprintActions.LoadCurrentSprintSuccess(sprint),
            new taskActions.UnselectAllTasks(null)
          ]),
          catchError(error => of(new sprintActions.LoadCurrentSprintError({error: error})))
        )
      })
    )

  @Effect()
  loadPastSprints$ = this.actions$
    .ofType(sprintActions.LOAD_PAST_SPRINTS).pipe(
      map((action: sprintActions.LoadPastSprints) => action.payload),
      switchMap((sprint: Sprint) => {
        return this.sprintService.getPastSprints()
        .pipe(
          map((sprints: Sprint[]) => new sprintActions.LoadPastSprintsSuccess(sprints)),
          catchError(error => of(new sprintActions.LoadPastSprintsError({error: error})))
        )
      })
    )
  

  @Effect()
  createSprint$ = this.actions$
    .ofType(sprintActions.CREATE_SPRINT).pipe(
      map((action: sprintActions.CreateSprint) => action.payload),
      switchMap((sprint: Sprint) => {
        return this.sprintService.createSprint(sprint).pipe(
          map((sprint: Sprint) => new sprintActions.CreateSprintSuccess(sprint),
          catchError(error => of(new sprintActions.CreateSprintError({error: error})))
          )
        )
      })
    )

  @Effect()
  sprintCompleted$ = this.socketService.sprintCompleted$.pipe(
    withLatestFrom(this.store$.select(getBoard)),
    switchMap(([sprint, board]) => [
      (new sprintActions.LoadCurrentSprint(null)),
      (new boardActions.LoadBoard(board?board.name : 'backlog'))
    ])
  )

  @Effect()
  taskAddedToSprint$ = this.socketService.taskAddedToSprint$.pipe(
    switchMap(payload => of(new sprintActions.TaskAddedToSprint(payload)))
  )

  @Effect()
  tasksAddedToSprint$ = this.socketService.tasksAddedToSprint$.pipe(
    switchMap(payload => of(new sprintActions.TasksAddedToSprint(payload)))
  )

  @Effect()
  taskRemovedFromSprint$ = this.socketService.taskRemovedFromSprint$.pipe(
    switchMap(payload => [
      (new sprintActions.TaskRemovedFromSprint(payload)),
      (new taskActions.UnselectTask(payload)),
    ])
  )

  @Effect()
  tasksRemovedFromSprint$ = this.socketService.tasksRemovedFromSprint$.pipe(
    switchMap(payload => [
      (new sprintActions.TasksRemovedFromSprint(payload)),
      (new taskActions.UnselectMultipleTasks(payload))
    ])
  )

  @Effect()
  updateSprintTaskPosition$ = this.actions$
    .ofType(sprintActions.UPDATE_SPRINT_TASK_POSITION).pipe(
      map((action: sprintActions.UpdateSprintTaskPosition) => action.payload),
      switchMap((action) => this.sprintService.updateTaskPosition(action.fromIndex, action.toIndex, action.list).pipe(
        map((sprint: Sprint) => new sprintActions.UpdateSprintTaskPositionSuccess(sprint)),
        catchError(error => of(new sprintActions.UpdateSprintTaskPositionError({error: error})))
        )
      )
    )

  @Effect()
  changeTaskStatus$ = this.actions$
    .ofType(sprintActions.CHANGE_TASK_STATUS).pipe(
      map((action: sprintActions.ChangeTaskStatus) => action.payload),
      switchMap((action) => this.sprintService.changeTaskStatus(action.currentStatus, action.newStatus, action.taskId).pipe(
        map((sprint: Sprint) => new sprintActions.ChangeTaskStatusSuccess(sprint)),
        catchError(error => of(new sprintActions.ChangeTaskStatusError({error: error})))
        )
      )
    )

  @Effect()
  taskStatusChanged$ = this.socketService.taskStatusChanged$.pipe(
    switchMap((action) => of(new sprintActions.TaskStatusChanged(action)))
  )
  
  @Effect()
  sprintTaskPositionUpdated$ = this.socketService.sprintTaskPositionUpdated$.pipe(
    switchMap((action) => of(new sprintActions.SprintTaskPositionUpdated(action)))
  )

  @Effect()
  completeCurrentSprint$ = this.actions$
      .ofType(sprintActions.COMPLETE_SPRINT).pipe(
        map((action: sprintActions.CompleteSprint) => action.payload),
        switchMap((action) => this.sprintService.completeSprint().pipe(
          map((sprint) => new sprintActions.CompleteSprintSuccess(sprint)),
          catchError(error => of(new sprintActions.CompleteSprintError({error: error})))
        )
      )
    )
}
