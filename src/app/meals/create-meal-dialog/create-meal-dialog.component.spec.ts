import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMealDialogComponent } from './create-meal-dialog.component';

describe('CreateMealDialogComponent', () => {
  let component: CreateMealDialogComponent;
  let fixture: ComponentFixture<CreateMealDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMealDialogComponent]
    });
    fixture = TestBed.createComponent(CreateMealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
