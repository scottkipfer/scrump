import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NewTaskComponent} from './components/new-task/new-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {}
  title : string = 'ScrumP';
  activeTab : string = 'current';

  ngOnInit() {
    // determine which tab is active
    var result = /[^/]*$/.exec(window.location.pathname)[0];
    if (!result) {
      result = 'current';
    }
    if (result === 'completed') {
      result = 'sprints';
    }
    this.setActive(result);
  }

  openModal() {
    const modalRef = this.modalService.open(NewTaskComponent);
  }

  setActive(tabName) {
    this.activeTab = tabName;
  }
}
