import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, tap} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {TaskService} from '../../services/task/task.service';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Task} from '../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private store: Store<fromStore.AppState>) { }
  boardName$: Observable<string>;

  ngOnInit() {

    this.boardName$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => {
        this.store.dispatch(new fromStore.GetTasksByBoard(params.get('name')));
        //this.taskService.getTasksForBoard(params.get('name'));
      }),
      map((params: ParamMap) => params.get('name')));
  }

}
