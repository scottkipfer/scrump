import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Task } from './task';
import { TASKS } from './mock-tasks';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = TASKS;
  tasksUrl: string = 'http://localhost:2700/v1/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    console.log("returning observable of: ", TASKS);
    return this.http.get<Task[]>(this.tasksUrl);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** POST: add a new task to the server */
  addTask (task: Task): Observable<Task> {
    console.log("in service addTask", task);
    return this.http.post<Task>(this.tasksUrl, task, httpOptions).pipe(
      tap(taskResult => this.tasks.push(taskResult)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

}
