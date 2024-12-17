import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpExternalUserComponent } from './sign-up-external-user.component';

describe('SignUpExternalUserComponent', () => {
  let component: SignUpExternalUserComponent;
  let fixture: ComponentFixture<SignUpExternalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpExternalUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpExternalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
