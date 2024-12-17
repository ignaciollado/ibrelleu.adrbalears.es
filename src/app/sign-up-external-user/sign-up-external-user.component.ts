import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'adr-sign-up-external-user',
  templateUrl: './sign-up-external-user.component.html',
  styleUrl: './sign-up-external-user.component.scss'
})
export class SignUpExternalUserComponent {
  public mustShowForm: boolean = false

  profileForm = new FormGroup({
    dni: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    mainPhone: new FormControl('', [Validators.maxLength(9), Validators.minLength(9)]),
    mainMail: new FormControl('', [Validators.email]),
    localizationAddress: new FormControl(''),
    zipCode: new FormControl('', [Validators.minLength(5), Validators.maxLength(5)]),
    localizationCity: new FormControl(''),
    localizationCCAA: new FormControl('Illes Balears'),
    userProfile: new FormControl('', [Validators.required])
  });

  showForm() {
    console.log (this.profileForm.value)
    this.mustShowForm = true
  }

  validateForm() {

  }

}
