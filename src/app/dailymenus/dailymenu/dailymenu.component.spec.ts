import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailymenuComponent } from './dailymenu.component';

describe('DailymenuComponent', () => {
  let component: DailymenuComponent;
  let fixture: ComponentFixture<DailymenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailymenuComponent]
    });
    fixture = TestBed.createComponent(DailymenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
