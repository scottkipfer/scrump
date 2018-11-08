import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTasksConfirmComponent } from './delete-tasks-confirm.component';

describe('DeleteTasksConfirmComponent', () => {
  let component: DeleteTasksConfirmComponent;
  let fixture: ComponentFixture<DeleteTasksConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTasksConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTasksConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
