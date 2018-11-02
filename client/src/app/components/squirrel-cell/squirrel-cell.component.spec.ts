import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquirrelCellComponent } from './squirrel-cell.component';

describe('SquirrelCellComponent', () => {
  let component: SquirrelCellComponent;
  let fixture: ComponentFixture<SquirrelCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquirrelCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquirrelCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
