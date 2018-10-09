import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../task';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() tasksHeader: string;
  @Input() statusFilter: string;
  editingSummary: false;

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
  }

  saveChanges(task) {
    console.log("task is now: ", task, "need to call API here to save it");
  }

  updateStatus(task, status) {
    task.status = status;
    console.log("call api here to update status");
  }
}
