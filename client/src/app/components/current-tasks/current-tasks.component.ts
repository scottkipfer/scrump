import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task/task.service';
import {SprintService} from '../../services/sprint/sprint.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-current-tasks',
  templateUrl: './current-tasks.component.html',
  styleUrls: ['./current-tasks.component.css']
})
export class CurrentTasksComponent implements OnInit {

  constructor(private taskService: TaskService, private sprintService: SprintService) { }

  ngOnInit() {
    this.sprintService.getCurrentSprint().pipe(
      tap((currentSprint) => this.taskService.getTasksForSprint(1))
    );
  }

}
