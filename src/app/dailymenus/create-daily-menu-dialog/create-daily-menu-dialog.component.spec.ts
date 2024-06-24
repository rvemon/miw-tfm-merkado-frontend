import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDailyMenuDialogComponent } from './create-daily-menu-dialog.component';

describe('CreateDailyMenuDialogComponent', () => {
  let component: CreateDailyMenuDialogComponent;
  let fixture: ComponentFixture<CreateDailyMenuDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDailyMenuDialogComponent]
    });
    fixture = TestBed.createComponent(CreateDailyMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
