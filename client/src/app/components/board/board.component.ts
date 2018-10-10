import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, tap} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {TaskService} from '../../services/task/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService ) { }
  boardName$: Observable<string>;

  ngOnInit() {
    this.boardName$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => {
        this.taskService.getTasksForBoard(params.get('name'));
      }),
      map((params: ParamMap) => params.get('name')));
  }

}
