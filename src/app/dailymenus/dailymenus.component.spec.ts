import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailymenusComponent } from './dailymenus.component';

describe('DailymenusComponent', () => {
  let component: DailymenusComponent;
  let fixture: ComponentFixture<DailymenusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailymenusComponent]
    });
    fixture = TestBed.createComponent(DailymenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
