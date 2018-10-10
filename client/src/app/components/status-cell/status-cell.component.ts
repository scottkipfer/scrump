import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-cell',
  templateUrl: './status-cell.component.html',
  styleUrls: ['./status-cell.component.css']
})
export class StatusCellComponent implements OnInit {
  @Input() status: string;
  @Output() statusChange = new EventEmitter();

  statusIcon: string;
  icons: any = {
    'Not Started': 'far fa-clock',
    'In Progress': 'fas fa-laptop-code',
    'On Hold': 'far fa-hand-paper',
    'Cancelled': 'fas fa-ban',
    'Completed': 'fa fa-check-circle'
  }

  constructor() { }

  ngOnInit() {
    this.getStatusIcon();
  }

  getStatusIcon() {
    this.statusIcon = this.icons[this.status];
  }
  
  setStatus(status) {
    this.status = status;
    this.statusChange.emit(this.status);
    this.getStatusIcon();
  }

}
