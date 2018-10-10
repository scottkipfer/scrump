import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task';

import { TaskService } from '../../services/task/task.service';

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
  }

  saveChanges(task) {
    this.taskService.updateTask(task).subscribe();
  }

}
