import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-cell',
  templateUrl: './status-cell.component.html',
  styleUrls: ['./status-cell.component.css']
})
export class StatusCellComponent implements OnInit {
  @Input() list: string;
  @Output() listChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  setList(newList) {
    this.listChange.emit({ currentStatus: this.list, newStatus: newList });
  }

}
