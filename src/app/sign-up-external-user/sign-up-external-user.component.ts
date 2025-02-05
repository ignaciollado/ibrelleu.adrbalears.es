import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../Services/data.service';
import { ContactDTO } from '../Models/contact.dto';
import { AccountDTO } from '../Models/account.dto';
import { Router } from '@angular/router';
import { ZipCodesIBDTO } from '../Models/zip-codes-ib.dto';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from '../Services/custom-validators.service';
import { EmailManagementService } from '../Services/emailManagement.service';
import { ContactService } from '../Services/contact.service';
import { AccountService } from '../Services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'adr-sign-up-external-user',
  templateUrl: './sign-up-external-user.component.html',
  styleUrl: './sign-up-external-user.component.scss',
})
export class SignUpExternalUserComponent {
  public mustShowField: boolean = false
  public successSend: boolean = false
  public zipCodeList: ZipCodesIBDTO[] = []
  filteredOptions: Observable<ZipCodesIBDTO[]>
  options: ZipCodesIBDTO[] = []
  destinationsMail: string[] = []
  errorMessage: string = ''

  profileForm = new FormGroup({
    dni: new FormControl('', [ Validators.required, this.customValidators.dniNieCifValidator(), ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    mainPhone: new FormControl('', [ Validators.maxLength(9), Validators.minLength(9), ]),
    mainMail: new FormControl('', [Validators.required, Validators.email]),
    localizationAddress: new FormControl(''),
    zipCode: new FormControl('', [ Validators.minLength(5), Validators.maxLength(5), ]),
    localizationCity: new FormControl({ value: '', disabled: true }),
    councilCity: new FormControl({ value: '', disabled: true }),
    island: new FormControl({ value: '', disabled: true }),
    userProfile: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl(true, [Validators.requiredTrue]),
  });

  constructor (
    private dataService: DataService, private contactService: ContactService, private accountService: AccountService,
    private router: Router,
    private customValidators: CustomValidatorsService,
    private emailManagementService: EmailManagementService,
    private snackBar: MatSnackBar
  ) {
    this.getAllZipCodes();
  }

  ngOnInit() {
    this.filteredOptions = this.profileForm.get('zipCode').valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  validateDNI(event: any) {
    if (this.profileForm.get('dni').value === '' || !event.checked) { console.log(event.checked); return; }
    if (!this.mustShowField) {
      this.contactService.getContactByDNI(this.profileForm.get('dni').value)
      .subscribe((contact: any) => {
        if (contact.message === "Contact not found") 
          {
          this.accountService.getAccountByCIF(this.profileForm.get('dni').value) /* existe alguna cuenta para este dniniecif */
          .subscribe((account: any) => {
            if (account.message === "Account not found") 
              {
              this.mustShowField = true;
              this.getAllZipCodes();
              } 
            else 
              {
                this.showSnackBar("existe la cuenta y se le enviará un correo electrónico")
             /*  this.emailManagementService.sendCustomerEmail(account)
                .subscribe(() => { this.showSnackBar(`Account existent, gràcies por contactar-nos, en breu rebrà un correu electrònic informatiu !!!`) }) */
              }
          });
          } else {
            /* this.showSnackBar("existe el contacto y se le enviará un correo electrónico") */
            this.emailManagementService.sendCustomerEmail(contact)
            .subscribe((result) => {
              console.log ("the result: ", result)
              this.successSend = true
              this.showSnackBar(`Gràcies por contactar-nos, en breu rebrà un correu electrònic informatiu !!!`) 
            },  error => {
              this.showSnackBar(error)
            })
          }
      },
      error => {
        this.showSnackBar(error)
      });
    }
  }

  createContact(): void {
    this.contactService.createContact(this.profileForm.value).subscribe( (data:any) => {
      /* this.destinationsMail.push(this.profileForm.get('mainMail').toString()) */
        this.emailManagementService.sendCustomerEmail(this.profileForm)            .subscribe((result) => {
          console.log ("the result: ", result)
          this.successSend = true
          this.profileForm.reset()
          this.showSnackBar(`Gràcies por contactar-nos, en breu rebrà un correu electrònic informatiu !!!`) 
        },  error => {
          this.showSnackBar(error)
        })
      },
      error => {
        this.showSnackBar(error)
      }
    );
  }

  getAllZipCodes() {
    this.dataService.getAllZipCodes().subscribe((zpCodes: ZipCodesIBDTO[]) => {
      this.zipCodeList = zpCodes;
      this.options = zpCodes;
    });
  }

  selectedValue(event: any) {
/*     console.log(
      'zp seleccionado: ',
      this.profileForm.get('zipCode').value,
      this.profileForm.get('zipCode').value.length
    ); */
    this.profileForm
      .get('localizationCity')
      .setValue(this.profileForm.get('zipCode').value['town']);
    this.profileForm
      .get('councilCity')
      .setValue(this.profileForm.get('zipCode').value['council']);
    this.profileForm
      .get('island')
      .setValue(this.profileForm.get('zipCode').value['island']);
  }

  displayFn(zpCode: ZipCodesIBDTO): string {
    return zpCode && zpCode.zipCode ? zpCode.zipCode : '';
  }

  private _filter(name: string): ZipCodesIBDTO[] {
    const filterValue = name;
    return this.options.filter((option) =>
      option.zipCode.includes(filterValue)
    );
  }

  updateField(): void {
    console.log('Field is updated!');
  }

  private showSnackBar(error: string): void {
    this.snackBar.open(error, 'Close', { duration: 100000, });
  }
}
