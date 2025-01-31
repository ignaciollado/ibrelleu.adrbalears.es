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
  sectorList: any[] = [];
  activityList: any[] = [];

  clientTypologyList: any[] = [];
  continentList: any[] = [];

  propertyStatus: any[] = [
    { value: 'Lloguer', view: 'Lloguer' },
    { value: 'Propietat', view: 'Propietat' },
  ];

  debtsSitesList: any[] = [];

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
      // Identificació
      legalFormat: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      nif: new FormControl('', [Validators.required]),
      tradeName: new FormControl('', Validators.required),
      paradesMercat: new FormControl(''),
      collaborationCompanys: new FormControl(''),
      councilTitularity: new FormControl(''),
      sportConcessions: new FormControl(''),
      activeBusiness: new FormControl(''),
      creationYear: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]{4}'),
      ]),
      consultor: new FormControl('', [Validators.required]),
      delegacion: new FormControl(''),

      // Localització
      direccion: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      localizationCity: new FormControl({ value: '', disabled: true }),
      councilCity: new FormControl({ value: '', disabled: true }),
      localizationCCAA: new FormControl({ value: '', disabled: true }),
      localizationCountry: new FormControl({ value: 'España', disabled: true }),

      // Dades de contacte
      companyEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      companyPhone: new FormControl('', [
        Validators.pattern('[0-9]{9}'),
        Validators.required,
      ]),
      companyWeb: new FormControl(''),

      // Detall de l'activitat
      companySector: new FormControl('', Validators.required),
      companyActivity: new FormControl('', Validators.required),
      activityDescription: new FormControl('', Validators.maxLength(1024)),
      carrerDescription: new FormControl('', Validators.maxLength(1024)),
      checkProduct: new FormControl(''),
      descriptionProduct: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),
      descriptionProductProcess: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),
      brandCheck: new FormControl(''),
      brandDescription: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),
      stockCheck: new FormControl(''),
      stockDescription: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),
      auditoryCheck: new FormControl(''),
      licenseCheck: new FormControl(''),
      marketDescription: new FormControl('', Validators.maxLength(1024)),
      targetDescription: new FormControl('', Validators.maxLength(1024)),
      typologyClients: new FormControl(''),
      suppliersDescription: new FormControl('', Validators.maxLength(1024)),
      competitionDescription: new FormControl('', Validators.maxLength(1024)),
      exportCheck: new FormControl(''),
      exportAmbit: new FormControl({ value: '', disabled: true }),
      exportDescription: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),
      importCheck: new FormControl(''),
      importAmbit: new FormControl({ value: '', disabled: true }),
      importDescription: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),

      // Estructura i organiztació
      partnerNumber: new FormControl('', Validators.required),
      organizationDescription: new FormControl('', Validators.maxLength(1024)),
      distributionDescription: new FormControl('', Validators.maxLength(1024)),
      workingDayDescription: new FormControl('', Validators.maxLength(1024)),
      fullTimeWorkers: new FormControl(''),
      partialTimeWorkers: new FormControl(''),
      totalWorkers: new FormControl({ value: '0', disabled: true }),
      workersCarrerDescription: new FormControl('', Validators.maxLength(1024)),
      workersSalaryDescription: new FormControl('', Validators.maxLength(1024)),
      colaborationDescription: new FormControl('', Validators.maxLength(1024)),
      property: new FormControl(''),
      rentValue: new FormControl({ value: '', disabled: true }),
      localSize: new FormControl(''),
      localRentingDescription: new FormControl('', Validators.maxLength(1024)),
      anotherSpecificationsDescription: new FormControl(
        '',
        Validators.maxLength(1024)
      ),

      // Estructura económica
      financingDescription: new FormControl('', Validators.maxLength(1024)),
      debtsCheck: new FormControl(''),
      debtsList: new FormControl(''),
      debtsDescription: new FormControl('', Validators.maxLength(1024)),
      lastYearFacturation: new FormControl(''),
      lastYearResult: new FormControl(''),
      lastYearResultDescription: new FormControl(
        '',
        Validators.maxLength(1024)
      ),
      lastYearBeforeTaxes: new FormControl(''),
      oneYearAgoFacturation: new FormControl(''),
      oneYearAgoResult: new FormControl(''),
      oneYearAgoResultDescription: new FormControl(
        '',
        Validators.maxLength(1024)
      ),
      oneYearAgoBeforeTaxes: new FormControl(''),
      twoYearAgoFacturation: new FormControl(''),
      twoYearAgoResult: new FormControl(''),
      twoYearAgoResultDescription: new FormControl(
        '',
        Validators.maxLength(1024)
      ),
      twoYearAgoBeforeTaxes: new FormControl(''),
    });

    this.getCountries();
    this.getAllZipCodes();
    this.loadLegalFormList();
    this.loadConsultantAndDelegationInfo();
    this.loadSectorInfo();
    this.loadActivityInfo();
    this.loadClientInfo();
    this.loadContinentInfo();
    this.loadDebtsSitesInfo();
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

  loadDebtsSitesInfo() {
    this.dataService.getAllDebtsSites().subscribe((debtsSitesItems: any[]) => {
      this.debtsSitesList = debtsSitesItems;
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
     /*  console.log(this.options); */
    });
  }

  loadContinentInfo() {
    this.dataService.getAllContinents().subscribe((continentItems: any[]) => {
      this.continentList = continentItems;
    });
  }

  onSubmit() {
    /* console.log(this.theForm.value); */
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

  // He implementado esta lógica como nexo a las llamadas de los métodos que realizan los cambios
  afterCheckChanges(
    event: any,
    checkName: string,
    checkFormName?: string[],
    className?: string
  ) {
    let checkValue = this.theForm.get(checkName).value;
    let afterCheckForms: any[] = [];

    if (checkFormName != undefined) {
      checkFormName.forEach((form) => {
        afterCheckForms.push(this.theForm.get(form));
      });
      this.changeEnable(afterCheckForms, checkValue);
    } else if (className != undefined) {
      let elements = document.querySelectorAll('.' + className);
      this.changeDisplay(elements, checkValue);
    }
  }

  changeEnable(afterCheckForms: any[], check: boolean) {
    afterCheckForms.forEach((form) => {
      if (check) {
        form.enable();
      } else {
        form.disable();
      }
    });
  }

  changeDisplay(elements: any, check: boolean) {
    elements.forEach((element: any) => {
      if (check) {
        element.setAttribute('style', 'display: grid');
      } else {
        element.setAttribute('style', 'display: none');
      }
    });
  }

  calculateTotalWorkers(event: any) {
    let fullTimeWorkersNumber = this.theForm.get('fullTimeWorkers').value;
    let partialTimeWorkersNumber = this.theForm.get('partialTimeWorkers').value;

    this.theForm
      .get('totalWorkers')
      .setValue(fullTimeWorkersNumber + partialTimeWorkersNumber);
  }

  checkPropertyStatus(event: any) {
    let propertyValue = this.theForm.get('property').value;
    let rentValue = this.theForm.get('rentValue');

    switch (propertyValue == 'Lloguer') {
      case true: {
        rentValue.enable();
        break;
      }
      default: {
        rentValue.disable();
        break;
      }
    }
  }

  // Pendiente de revisar
  // calculateDNI(event: any) {
  //   if (event.key != 'Backspace') {
  //     let dni = this.theForm.get('nif').value;
  //     if (typeof parseInt(dni) === 'number' && dni.length == 8) {
  //       let dniLetterResult = this.dniLetter[parseInt(dni) % 23];
  //       this.theForm.get('nif').setValue(dni + dniLetterResult);
  //     }
  //   }
  // }
}
