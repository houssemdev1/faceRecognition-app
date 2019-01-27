import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Face2Component } from './face2.component';

describe('Face2Component', () => {
  let component: Face2Component;
  let fixture: ComponentFixture<Face2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Face2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Face2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
