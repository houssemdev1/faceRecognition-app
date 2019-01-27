import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MheaderComponent } from './mheader.component';

describe('MheaderComponent', () => {
  let component: MheaderComponent;
  let fixture: ComponentFixture<MheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
