import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {map, switchMap, catchError, withLatestFrom} from 'rxjs/operators';
import {TaskService} from '../../services/task/task.service';
import {Task} from '../../models';
import {AppState} from '../../store/reducers';
import {getBoard} from '../../store/selectors/board.selectors';
import {SocketService} from '../../services/socket/socket.service';
import * as taskActions from '../actions/task.actions';
import * as boardActions from '../actions/board.actions';
import * as sprintActions from '../actions/sprint.actions';
import { getCurrentView } from '../selectors/view.selectors';

@Injectable()
export class TaskEffects {
  @Effect()
  createTask$ = this.actions$
    .ofType(taskActions.CREATE_TASK).pipe(
      map((action: taskActions.CreateTask) => action.payload),
      switchMap((task) => {
        return this.taskService.createTask(task).pipe(
          map(task => new taskActions.CreateTaskSuccess(task)),
          catchError(error => of(new taskActions.CreateTaskError({ error: error })))
        );
      })
    );

  @Effect()
  taskCreated$ = this.socketService.taskCreated$.pipe(
    switchMap(payload => of(new taskActions.TaskCreated(payload.task)))
  );

  @Effect()
  updateTask$ = this.actions$
    .ofType(taskActions.UPDATE_TASK).pipe(
      map((action: taskActions.UpdateTask) => action.payload),
      switchMap((payload) => {
        return this.taskService.updateTask(payload).pipe(
          map(task => new taskActions.UpdateTaskSuccess(task)),
          catchError(error => of(new taskActions.UpdateTaskError({ error: error })))
        );
      })
    );

  @Effect()
  taskUpdated$ = this.socketService.taskUpdated$.pipe(
    switchMap(task => of(new taskActions.TaskUpdated(task)).pipe(
      withLatestFrom(this.store$.select(getCurrentView)),
      map(([action, view]) => 
        view !== 'current' ? 
        new boardActions.UpdateTaskInBoard(action.payload) :
        new sprintActions.UpdateTaskInSprint(action.payload)
      ))
    )
  );

  @Effect()
  switchBoards$ = this.actions$
    .ofType(taskActions.SWITCH_BOARDS).pipe(
      map((action: taskActions.SwitchBoards) => action.payload),
      withLatestFrom(this.store$.select(getBoard)),
      switchMap(([switchBoardObj, board]) => {
        return this.taskService.switchBoards({
          task: switchBoardObj.task,
          newBoard: switchBoardObj.newBoard,
          oldBoard: (switchBoardObj.type == 'board') ? board.name : 'sprint'
        }).pipe(
          map(result => new taskActions.SwitchBoardsSuccess(result)),
          catchError(error => of(new taskActions.SwitchBoardsError({ error: error})))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private socketService: SocketService,
    private store$: Store<AppState>
  ) {}
}
