import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthHistoryDetailComponent } from './month-history-detail.component';

describe('MonthHistoryDetailComponent', () => {
  let component: MonthHistoryDetailComponent;
  let fixture: ComponentFixture<MonthHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
