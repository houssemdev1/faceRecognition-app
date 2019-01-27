import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfooterComponent } from './mfooter.component';

describe('MfooterComponent', () => {
  let component: MfooterComponent;
  let fixture: ComponentFixture<MfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
