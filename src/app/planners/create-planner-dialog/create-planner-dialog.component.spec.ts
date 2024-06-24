import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlannerDialogComponent } from './create-planner-dialog.component';

describe('CreatePlannerDialogComponent', () => {
  let component: CreatePlannerDialogComponent;
  let fixture: ComponentFixture<CreatePlannerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePlannerDialogComponent]
    });
    fixture = TestBed.createComponent(CreatePlannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
