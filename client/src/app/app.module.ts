import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TasksComponent } from './tasks/tasks.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextCellComponent } from './text-cell/text-cell.component';
import { TeamCellComponent } from './team-cell/team-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TextCellComponent,
    TeamCellComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    AngularFontAwesomeModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
