import { Component, EventEmitter } from '@angular/core';
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
  sectorList: any[] = [];
  activityList: any[] = [];

  clientTypologyList: any[] = [];
  continentList: any[] = [];

  dniLetter = {
    0: 'T',
    1: 'R',
    2: 'W',
    3: 'A',
    4: 'G',
    5: 'M',
    6: 'Y',
    7: 'F',
    8: 'P',
    9: 'D',
    10: 'X',
    11: 'B',
    12: 'N',
    13: 'J',
    14: 'Z',
    15: 'S',
    16: 'Q',
    17: 'V',
    18: 'H',
    19: 'L',
    20: 'C',
    21: 'K',
    22: 'E',
  };

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
      consultor: new FormControl('', [Validators.required]),
      delegacion: new FormControl(''),
      direccion: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      localizationCity: new FormControl({ value: '', disabled: true }),
      councilCity: new FormControl({ value: '', disabled: true }),
      localizationCCAA: new FormControl({ value: '', disabled: true }),
      localizationCountry: new FormControl({ value: 'España', disabled: true }),
      companyEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      companyPhone: new FormControl('', [
        Validators.pattern('[0-9]{9}'),
        Validators.required,
      ]),
      companyWeb: new FormControl(''),
      companySector: new FormControl('', Validators.required),
      companyActivity: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(1024)),
      typologyClients: new FormControl(''),
      check: new FormControl(''),
      importCheck: new FormControl(''),
      importDescription: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),
      exportDescription: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),
    });

    this.getCountries();
    this.getAllZipCodes();
    this.loadLegalFormList();
    this.loadConsultantAndDelegationInfo();
    this.loadSectorInfo();
    this.loadActivityInfo();
    this.loadClientInfo();
    this.loadContinentInfo();
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
          this.insertConsultantData(account.consultant);
          this.insertDelegationData(account.delegation);
        });
      });
  }
  insertConsultantData(consultant: string) {
    if (!this.consultantList.includes(consultant)) {
      this.consultantList.push(consultant);
    }
  }

  insertDelegationData(delegation: string) {
    if (!this.delegationList.includes(delegation)) {
      this.delegationList.push(delegation);
    }
  }

  loadSectorInfo() {
    this.dataService.getAllSectors().subscribe((sectorItems: any[]) => {
      this.sectorList = sectorItems;
    });
  }
  loadActivityInfo() {
    this.dataService.getAllActivities().subscribe((activityItems: any[]) => {
      this.activityList = activityItems;
    });
  }

  loadClientInfo() {
    this.dataService.getAllTypologies().subscribe((typologyItems: any[]) => {
      this.clientTypologyList = typologyItems;
    });
  }

  getCountries() {
    this.countriesService.getAll().subscribe((countries: CountriesDTO[]) => {
      this.countries = countries;
    });
  }
  getAllZipCodes() {
    this.dataService.getAllZipCodes().subscribe((zpCodes: ZipCodesIBDTO[]) => {
      this.zipCodeList = zpCodes;
      this.options = zpCodes;
      console.log(this.options);
    });
  }

  loadContinentInfo() {
    this.dataService.getAllContinents().subscribe((continentItems: any[]) => {
      this.continentList = continentItems;
    });
  }

  onSubmit() {
    console.log(this.theForm.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  selectedValue(event: any) {
    console.log('zp seleccionado: ', this.theForm.get('zipCode').value);
    this.theForm
      .get('localizationCity')
      .setValue(this.theForm.get('zipCode').value['town']);
    this.theForm
      .get('localizationCCAA')
      .setValue(this.theForm.get('zipCode').value['island']);
    this.theForm
      .get('councilCity')
      .setValue(this.theForm.get('zipCode').value['council']);
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

  // He implementado esta lógica de forma base para los activados y desactivados de campos tras un checkbox
  afterCheckEnable(event: any, checkName: string, afterCheckFormName: string) {
    let checked = this.theForm.get(checkName).value;
    let afterCheckForms = this.theForm.get(afterCheckFormName);

    switch (checked) {
      case true: {
        afterCheckForms.enable();
        break;
      }
      case false: {
        afterCheckForms.disable();
        break;
      }
    }
  }

  calculateDNI(event: any) {
    if (event.key != 'Backspace') {
      let dni = this.theForm.get('nif').value;
      if (typeof parseInt(dni) === 'number' && dni.length == 8) {
        let dniLetterResult = this.dniLetter[parseInt(dni) % 23];
        this.theForm.get('nif').setValue(dni + dniLetterResult);
      }
    }
  }
}
