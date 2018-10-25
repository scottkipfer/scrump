import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Board, Task, CreateTaskModel } from '../../models';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class TaskService {
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  public readonly tasks: Observable<Task[]> = this._tasks.asObservable();
  tasksUrl: string = `${environment.nodeServer}/v1/tasks`;
  commandUrl: string =`${environment.nodeServer}/command`;
  board: string;

  constructor(private http: HttpClient) { }

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

  public createTask(task: CreateTaskModel): Observable<Task> {
    return this.http.post<Task>(`${this.commandUrl}/createTask`, task, httpOptions);
  }

  public switchBoards(switchBoardObj): Observable<any> {
    return this.http.post(`${this.commandUrl}/switchBoards`, switchBoardObj, httpOptions);
  }

  public updateTask({task, field, value}): Observable<Task> {
    return this.http.post<Task>(`${this.commandUrl}/updateTask/${task._id}`, {field, value}, httpOptions);
  }

  public getTasksByBoard(board: string): Observable<Task[]> {
    const url = `${this.tasksUrl}?board=${board}`;
    return this.http.get<Task[]>(url, httpOptions);
  }

  public getTasksForSprint(sprintId) {
    let url = `${this.tasksUrl}?sprint=${sprintId}`;
    this.http.get<Task[]>(url).subscribe(
      tasks => this._tasks.next(tasks)
    ).unsubscribe();
  }

  public moveTaskFromTo(fromIndex: number, toIndex: number) {
    let updatedTasks = this._tasks.getValue();
    let popped = updatedTasks.splice(fromIndex, 1)[0];
    updatedTasks.splice(toIndex, 0, popped);
    this._tasks.next(updatedTasks)
  }
  
  public updateTaskPostion(fromIndex: number, toIndex: number, board: Board) {
    const url = `${this.commandUrl}/updateTaskPosition/${board}`;
    return this.http.post(url, {fromIndex, toIndex}, httpOptions);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

  /*public getTasksForBoard(board) {
    let url = this.tasksUrl;
    if (board) {
      url += `?board=${board}`;
      this.board = board;
    } else {
      this.board = null;
    }
    this.http.get<Task[]>(url).subscribe(
      tasks => this._tasks.next(tasks)
    );
  }*/

  /*public updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${task._id}`, task, httpOptions).pipe(
      tap((taskResult: Task) => {
        let updatedTasks = this._tasks.getValue();
        let index = updatedTasks.findIndex(_task => { return _task._id === task._id});

        if (this.board && this.board === taskResult.board) {
          updatedTasks.splice(index, 1, taskResult);
        } else {
          // it's not on the board we're looking at anymore
          updatedTasks.splice(index, 1);
        }
        this._tasks.next(updatedTasks);
      }),
      catchError(this.handleError<Task>('addTask'))
    );
  }*/
