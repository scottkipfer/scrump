import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksRoComponent } from './tasks-ro.component';

describe('TasksRoComponent', () => {
  let component: TasksRoComponent;
  let fixture: ComponentFixture<TasksRoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksRoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksRoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
