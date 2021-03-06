import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';
import { Sprint } from '../../models/sprint';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private _currentSprint: BehaviorSubject<Sprint> = new BehaviorSubject<Sprint>({});
  public readonly currentSprint: Observable<Sprint> = this._currentSprint.asObservable();
  sprintsUrl: string = `${environment.nodeServer}/v1/sprints`;
  currentSprintUrl: string = `${environment.nodeServer}/v1/currentSprint`;
  commandUrl: string = `${environment.nodeServer}/command`;

  public createSprint(sprint: Sprint): Observable<Sprint> {
    let url = `${this.commandUrl}/createSprint`;
    return this.http.post<Sprint>(url, sprint, httpOptions);
  }

  public getCurrentSprint(): Observable<Sprint> {
    let url = `${this.currentSprintUrl}`;
    return this.http.get<Sprint>(url);
  }

  public getPastSprints(): Observable<Sprint[]> {
    let url = `${this.sprintsUrl}?active=false`;
    return this.http.get<Sprint[]>(url);
  }

  public completeSprint(): Observable<Sprint> {
    const url = `${this.commandUrl}/completeSprint`;
    return this.http.post<Sprint>(url, {}, httpOptions)
  }

  public updateTaskPosition(fromIndex: number, toIndex: number, list: string) {
    const url = `${this.commandUrl}/updateSprintTaskPosition`;
    return this.http.post(url, {fromIndex, toIndex, list}, httpOptions);
  }

  public changeTaskStatus(fromStatus: string, toStatus: string, taskId: string) {
    const url = `${this.commandUrl}/updateTaskStatus`;
    return this.http.post(url, {fromStatus, toStatus, taskId});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }
}
