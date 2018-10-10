import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';
import { Sprint } from '../../models/sprint';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private _currentSprint: BehaviorSubject<Sprint> = new BehaviorSubject<Sprint>({});
  public readonly currentSprint: Observable<Sprint> = this._currentSprint.asObservable();
  sprintsUrl: string = 'http://localhost:2700/v1/sprints';

  public createSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.sprintsUrl, sprint, httpOptions).pipe(
      tap((newSprint: Sprint) => this._currentSprint.next(newSprint)),
      catchError(this.handleError<Sprint>('createSprint'))
    );
  }

  public getCurrentSprint(): void {
    let url = `${this.sprintsUrl}/current`;
    this.http.get<Sprint>(url).subscribe(
      currentSprint => this._currentSprint.next(currentSprint)
    ).unsubscribe();
  }

  public completeSprint(sprint:Sprint): Observable<Sprint> {
    const url = `${this.sprintsUrl}/complete`;
    return this.http.post<Sprint>(url, sprint, httpOptions).pipe(
      tap((newSprint: Sprint) => this._currentSprint.next(newSprint)),
      catchError(this.handleError<Sprint>('completeSprint'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }
}
