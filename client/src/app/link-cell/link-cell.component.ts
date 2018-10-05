import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-link-cell',
  templateUrl: './link-cell.component.html',
  styleUrls: ['./link-cell.component.css']
})
export class LinkCellComponent implements OnInit {
  @Input() link: string;
  @Output() linkChange = new EventEmitter();

  linkEdit: string;

  constructor() { }

  ngOnInit() {
    this.linkEdit = this.link;
  }

  prepEdit() {
    this.linkEdit = this.link;
  }

  saveLink() {
    this.link = this.linkEdit;
    this.linkChange.emit(this.link);
  }


}
