import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, tap, switchMap} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  boardName$: Observable<string>;

  ngOnInit() {
    this.boardName$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('name')));
  }

}
