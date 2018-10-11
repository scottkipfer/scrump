import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Effect, Actions} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, tap, switchMap, catchError} from 'rxjs/operators';
import {TaskService} from '../../services/task/task.service';
import * as taskActions from '../actions/task.actions';
import { Task, CreateTaskModel } from '../../models';

@Injectable()
export class TaskEffects {
  @Effect()
  createTask$ = this.actions$
    .ofType(taskActions.CREATE_TASK).pipe(
      map((action: taskActions.CreateTask) => action.payload),
      switchMap((task: CreateTaskModel) => {
        return this.taskService.createTask(task).pipe(
          map(task => new taskActions.CreateTaskSuccess(task)),
          catchError(error => of(new taskActions.CreateTaskError({error: error})))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private router: Router
  ) {}
}