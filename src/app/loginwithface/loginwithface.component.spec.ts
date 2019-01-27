import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwithfaceComponent } from './loginwithface.component';

describe('LoginwithfaceComponent', () => {
  let component: LoginwithfaceComponent;
  let fixture: ComponentFixture<LoginwithfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginwithfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginwithfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
