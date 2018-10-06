import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'ScrumP';
  activeTab : string = 'current';

  setActive(tabName) {
    this.activeTab = tabName;
  }
}
