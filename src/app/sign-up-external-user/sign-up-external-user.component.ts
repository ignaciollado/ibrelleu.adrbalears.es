import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../Services/data.service';
import { ContactDTO } from '../Models/contact.dto';
import { AccountDTO } from '../Models/account.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'adr-sign-up-external-user',
  templateUrl: './sign-up-external-user.component.html',
  styleUrl: './sign-up-external-user.component.scss'
})
export class SignUpExternalUserComponent {
  public mustShowField: boolean = false

  profileForm = new FormGroup({
    dni: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    mainPhone: new FormControl('', [Validators.maxLength(9), Validators.minLength(9)]),
    mainMail: new FormControl('', [Validators.required, Validators.email]),
    localizationAddress: new FormControl(''),
    zipCode: new FormControl('', [Validators.minLength(5), Validators.maxLength(5)]),
    localizationCity: new FormControl(''),
    localizationCCAA: new FormControl('Illes Balears'),
    userProfile: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl(false, [Validators.required])
  });

  constructor( private dataService: DataService, private router: Router ) {}

  validateDNI(event:any) {
    console.log (this.profileForm.get('dni').value)
    if (this.profileForm.get('dni').value === "" || !event.checked) {
      console.log (event.checked)
      return
    }
    if (!this.mustShowField) {
      this.dataService.getAllContacts()
      .subscribe((contacts: ContactDTO[])=> {
        const totalContacts:ContactDTO[] = contacts.filter((item:ContactDTO) => {return item.nif === this.profileForm.get('dni').value})
        if (totalContacts.length > 0){
         //navegar a contacto ???
         this.router.navigate(['contacts'])
        } else  {
          this.dataService.getAllAccounts()
          .subscribe((accounts:AccountDTO[])=> {
            const totalAccounts:AccountDTO[] = accounts.filter((item:AccountDTO) => {return item.nif === this.profileForm.get('dni').value})
            if (totalAccounts.length > 0) {
              //navegar a cuenta ???
              this.router.navigate(['accounts'])
            } else {
              this.mustShowField = true
            }
          })
        }
      })
    }
   }

  validateForm() {
    /* if (!this.mustShowField) {
      this.dataService.getAllContacts()
      .subscribe((contacts: ContactDTO[])=> {
        const totalContacts:ContactDTO[] = contacts.filter((item:ContactDTO) => {return item.nif === this.profileForm.get('dni').value})
        if (totalContacts.length > 0){
         //navegar a contacto ???
         this.router.navigate(['contacts'])
        } else  {
          this.dataService.getAllAccounts()
          .subscribe((accounts:AccountDTO[])=> {
            const totalAccounts:AccountDTO[] = accounts.filter((item:AccountDTO) => {return item.nif === this.profileForm.get('dni').value})
            if (totalAccounts.length > 0) {
              //navegar a cuenta ???
              this.router.navigate(['accounts'])
            } else {
              this.mustShowField = true
            }
          })
        }
      })
    } else { */
      console.log (this.profileForm.value)
    /* } */
  }

}
