import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterUserComponent } from './form-register-user.component';

describe('FormRegisterUserComponent', () => {
  let component: FormRegisterUserComponent;
  let fixture: ComponentFixture<FormRegisterUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegisterUserComponent]
    });
    fixture = TestBed.createComponent(FormRegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
