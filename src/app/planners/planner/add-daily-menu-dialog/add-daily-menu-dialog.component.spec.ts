import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyMenuDialogComponent } from './add-daily-menu-dialog.component';

describe('AddDailyMenuDialogComponent', () => {
  let component: AddDailyMenuDialogComponent;
  let fixture: ComponentFixture<AddDailyMenuDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDailyMenuDialogComponent]
    });
    fixture = TestBed.createComponent(AddDailyMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
