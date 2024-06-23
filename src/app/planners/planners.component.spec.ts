import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannersComponent } from './planners.component';

describe('PlannersComponent', () => {
  let component: PlannersComponent;
  let fixture: ComponentFixture<PlannersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlannersComponent]
    });
    fixture = TestBed.createComponent(PlannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
