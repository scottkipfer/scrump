import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-squirrel-cell',
  templateUrl: './squirrel-cell.component.html',
  styleUrls: ['./squirrel-cell.component.css']
})
export class SquirrelCellComponent implements OnInit {
  @Input() value: string;
  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getStatusImg() {
    let imgSrc = null;
    if (this.value === 'waiting') {
      imgSrc = '/assets/img/please.png';
    } else if (this.value === 'squirrelled') {
      imgSrc = '/assets/img/squirrel.png';
    }

    return imgSrc;
  }

  setStatus(status) {
    this.value = status;
    this.valueChange.emit(this.value);
  }
}
