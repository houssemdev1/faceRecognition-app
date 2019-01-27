import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacedatabaseComponent } from './facedatabase.component';

describe('FacedatabaseComponent', () => {
  let component: FacedatabaseComponent;
  let fixture: ComponentFixture<FacedatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacedatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacedatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
