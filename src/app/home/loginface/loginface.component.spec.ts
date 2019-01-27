import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfaceComponent } from './loginface.component';

describe('LoginfaceComponent', () => {
  let component: LoginfaceComponent;
  let fixture: ComponentFixture<LoginfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
