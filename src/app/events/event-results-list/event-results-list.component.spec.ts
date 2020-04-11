import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventResultsListComponent } from './event-results-list.component';

describe('EventResultsListComponent', () => {
  let component: EventResultsListComponent;
  let fixture: ComponentFixture<EventResultsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventResultsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
