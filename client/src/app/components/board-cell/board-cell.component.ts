import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.css']
})
export class BoardCellComponent implements OnInit {
  @Input() board : string;
  @Output() boardChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setBoard(board) {
    this.board = board;
    this.boardChange.emit(this.board);
  }
}
