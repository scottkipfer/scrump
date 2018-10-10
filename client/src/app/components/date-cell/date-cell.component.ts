import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-date-cell',
  templateUrl: './date-cell.component.html',
  styleUrls: ['./date-cell.component.css']
})
export class DateCellComponent implements OnInit {
  @Input() date: Date;
  @Output() dateChange = new EventEmitter();

  isEditing: boolean = false;
  today: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.isEditing = true;
  }

  finishEdit() {
    if (this.isEditing) {
      this.dateChange.emit(this.date);
      this.isEditing = false;
    }
  }
}
