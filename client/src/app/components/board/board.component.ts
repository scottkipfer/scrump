import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, tap, take} from 'rxjs/operators';
import {Observable} from 'rxjs'
import {TaskService} from '../../services/task/task.service';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Board, Task} from '../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public boardName$: Observable<string>;
  public board$: Observable<Board>;
  public boardTasks$: Observable<Task[]>;
  public boardError$: Observable<any>;
  public boardName: string;

  ngOnInit() {
    this.boardError$ = this.store.select(fromStore.getBoardError);
    this.board$ = this.store.select(fromStore.getBoard);
    this.boardTasks$ = this.board$.pipe(
      map((board: Board) => board? board.tasks : [])
    );
    this.boardName$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => {
        this.boardName = params.get('name');
        this.store.dispatch(new fromStore.LoadBoard(params.get('name')));
        this.store.dispatch(new fromStore.UpdateView(this.boardName))
      }),
      map((params: ParamMap) => params.get('name')));
  }

  createBoard() {
    this.store.dispatch(new fromStore.CreateBoard({
      name: this.boardName,
      tasks: []
    }));
  }

  constructor(private route: ActivatedRoute, private taskService: TaskService, private store: Store<fromStore.AppState>) { }

}
