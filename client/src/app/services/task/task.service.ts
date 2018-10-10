import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Task } from '../../models/task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class TaskService {
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  public readonly tasks: Observable<Task[]> = this._tasks.asObservable();
  tasksUrl: string = 'http://localhost:2700/v1/tasks';

  constructor(private http: HttpClient) { }

  public getTasksForBoard(board) {
    let url = this.tasksUrl;
    if (board) {
      url += `?board=${board}`;
    }
    this.http.get<Task[]>(url).subscribe(
      tasks => this._tasks.next(tasks)
    ).unsubscribe();
  }

  public getTasksForSprint(sprintId) {
    let url = `${this.tasksUrl}?sprint=${sprintId}`;
    this.http.get<Task[]>(url).subscribe(
      tasks => this._tasks.next(tasks)
    ).unsubscribe();
  }

  public updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${task._id}`, task, httpOptions).pipe(
      tap((taskResult: Task) => {
        let updatedTasks = this._tasks.getValue();
        let index = updatedTasks.findIndex(_task => { return _task._id === task._id});
        updatedTasks.splice(index, 1, taskResult);
        this._tasks.next(updatedTasks)
      }),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  public addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, httpOptions).pipe(
      tap((taskResult: Task) => {
        let updatedTasks = this._tasks.getValue();
        updatedTasks.push(taskResult);
        this._tasks.next(updatedTasks)
      }),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
