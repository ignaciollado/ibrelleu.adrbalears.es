import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';
import { DataService } from '../../Services/data.service';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { LegalFormDTO } from '../../Models/legal-form.dto';
import { map, Observable, startWith } from 'rxjs';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { AccountDTO } from '../../Models/account.dto';

@Component({
  selector: 'adr-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss',
})
export class AccountDetailComponent implements CanComponentDeactivate {
  isElevated: boolean = true;
  theForm: FormGroup;
  countries: CountriesDTO[] = [];
  zipCodeList: ZipCodesIBDTO[] = [];
  legalFormList: any[] = [];
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];

  consultantList: string[] = [];
  delegationList: string[] = [];

  constructor(
    private dataService: DataService,
    private countriesService: CountriesService
  ) {
    this.theForm = new FormGroup({
      legalFormat: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      nif: new FormControl('', [Validators.required]),
      tradeName: new FormControl('', Validators.required),
      paradesMercat: new FormControl(''),
      creationYear: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]{4}'),
      ]),
      incomingYear: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      consultor: new FormControl('', [Validators.required]),
      delegacion: new FormControl(''),
      companyFundationMode: new FormControl(''),
      zipCode: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      localizationCity: new FormControl({ value: '', disabled: true }),
      councilCity: new FormControl({ value: '', disabled: true }),
      localizationCCAA: new FormControl({ value: '', disabled: true }),
      localizationCountry: new FormControl({ value: 'España', disabled: true }),
      direccion: new FormControl('', [Validators.required]),
    });

    this.getCountries();
    this.getAllZipCodes();
    this.loadLegalFormList();
    this.loadConsultantAndDelegationInfo();
  }

  ngOnInit() {
    this.filteredOptions = this.theForm.get('zipCode').valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.theForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  loadLegalFormList() {
    this.dataService
      .getAllLegalForms()
      .subscribe((legalItems: LegalFormDTO[]) => {
        this.legalFormList = legalItems;
      });
  }

  loadConsultantAndDelegationInfo() {
    this.dataService
      .getAllAccounts()
      .subscribe((accountsList: AccountDTO[]) => {
        accountsList.forEach((account) => {
          let consultant: string = account.consultant;
          let delegation: string = account.delegation;
          if (!this.consultantList.includes(consultant)) {
            this.consultantList.push(consultant);
          }
          if (!this.delegationList.includes(delegation)) {
            this.delegationList.push(delegation);
          }
        });
      });
  }

  getCountries() {
    this.countriesService.getAll().subscribe((countries: CountriesDTO[]) => {
      this.countries = countries;
    });
  }

  onSubmit() {
    console.log(this.theForm.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  getAllZipCodes() {
    this.dataService.getAllZipCodes().subscribe((zpCodes: ZipCodesIBDTO[]) => {
      this.zipCodeList = zpCodes;
      this.options = zpCodes;
      console.log(this.options);
    });
  }

  selectedValue(event: any) {
    console.log('zp seleccionado: ', this.theForm.get('zipCode').value);
    this.theForm
      .get('localizationCity')
      .setValue(this.theForm.get('zipCode').value['town']);
    this.theForm
      .get('localizationCCAA')
      .setValue(this.theForm.get('zipCode').value['island']);
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
}
