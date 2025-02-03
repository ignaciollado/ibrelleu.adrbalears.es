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
import { ContactService } from '../Services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'adr-sign-up-external-user',
  templateUrl: './sign-up-external-user.component.html',
  styleUrl: './sign-up-external-user.component.scss',
})
export class SignUpExternalUserComponent {
  public mustShowField: boolean = false;
  public zipCodeList: ZipCodesIBDTO[] = [];
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];
  errorMessage: string = '';

  profileForm = new FormGroup({
    dni: new FormControl('', [
      Validators.required,
      this.customValidators.dniNieCifValidator(),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    mainPhone: new FormControl('', [
      Validators.maxLength(9),
      Validators.minLength(9),
    ]),
    mainMail: new FormControl('', [Validators.required, Validators.email]),
    localizationAddress: new FormControl(''),
    zipCode: new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    localizationCity: new FormControl({ value: '', disabled: true }),
    councilCity: new FormControl({ value: '', disabled: true }),
    localizationCCAA: new FormControl({ value: '', disabled: true }),
    userProfile: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl(true, [Validators.requiredTrue]),
  });

  constructor (
    private dataService: DataService, private contactService: ContactService,
    private router: Router,
    private customValidators: CustomValidatorsService,
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
    console.log(this.profileForm.get('dni').value);
    if (this.profileForm.get('dni').value === '' || !event.checked) {
      console.log(event.checked);
      return;
    }
    if (!this.mustShowField) {
      this.dataService.getAllContacts().subscribe((contacts: ContactDTO[]) => {
        const totalContacts: ContactDTO[] = contacts.filter(
          (item: ContactDTO) => {
            return item.nif === this.profileForm.get('dni').value;
          }
        );
        if (totalContacts.length > 0) {
          //navegar a contacto ???
          this.router.navigate(['contacts']);
        } else {
          this.dataService
            .getAllAccounts()
            .subscribe((accounts: AccountDTO[]) => {
              const totalAccounts: AccountDTO[] = accounts.filter(
                (item: AccountDTO) => {
                  return item.nif === this.profileForm.get('dni').value;
                }
              );
              if (totalAccounts.length > 0) {
                //navegar a cuenta ???
                this.router.navigate(['accounts']);
              } else {
                this.mustShowField = true;
                this.getAllZipCodes();
              }
            });
        }
      });
    }
  }

  createContact(): void {
    this.contactService.createContact(this.profileForm).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.showError(error);
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
    console.log(
      'zp seleccionado: ',
      this.profileForm.get('zipCode').value,
      this.profileForm.get('zipCode').value.length
    );
    this.profileForm
      .get('localizationCity')
      .setValue(this.profileForm.get('zipCode').value['town']);
    this.profileForm
      .get('councilCity')
      .setValue(this.profileForm.get('zipCode').value['council']);
    this.profileForm
      .get('localizationCCAA')
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

  private showError(error: string): void {
    this.snackBar.open(error, 'Close', {
      duration: 3000,
    });
  }
}
