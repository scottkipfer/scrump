import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models';

@Component({
  selector: 'app-tasks-ro',
  templateUrl: './tasks-ro.component.html',
  styleUrls: ['./tasks-ro.component.css']
})

export class TasksRoComponent implements OnInit {
  @Input() tasksHeader: string;
  @Input() tasks: Observable<Task[]>;

  constructor() { }

  ngOnInit() {
  }

}
