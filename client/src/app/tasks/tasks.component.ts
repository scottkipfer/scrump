import { Component, OnInit } from '@angular/core';

import { Task } from '../task';

// fake data
import { TASKS } from '../mock-tasks';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  editingSummary: false;

  tasks = TASKS;

  constructor() { }

  ngOnInit() {
  }

  saveChanges(task) {
    console.log("task is now: ", task);
  }
}
