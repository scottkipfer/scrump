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
    'Not Started': 'fa-hourglass',
    'In Progress': 'fa-play-circle',
    'On Hold': 'fa-pause-circle',
    'Cancelled': 'fa-stop-circle',
    'Completed': 'fa-check-circle'
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
