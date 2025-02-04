import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../Services/data.service';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { Observable } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AccountDTO } from '../../Models/account.dto';

@Component({
  selector: 'adr-success-stories-detail',
  templateUrl: './success-stories-detail.component.html',
  styleUrl: './success-stories-detail.component.scss',
})
export class SuccessStoriesDetailComponent implements CanComponentDeactivate {
  submitted: boolean = true;
  theForm: FormGroup;
  countries: CountriesDTO[] = [];
  public zipCodeList: ZipCodesIBDTO[] = [];
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];
  id: string = this.route.snapshot.paramMap.get('id');
  selectedIndex: number;

  ibRelleuTypologyList: any[] = [];

  delegationList: any[] = [];
  consultantList: any[] = [];
  sectorList: any[] = [];
  activityList: any[] = [];

  contractTypologyList: any[] = [];
  transmissionTypologyList: any[] = [];
  paymentTypeList: any[] = [];
  paymentTypologyList: any[] = [];

  constructor(
    private dataService: DataService,
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {
    this.theForm = new FormGroup({
      // Datos generales
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      ibRelleuTypology: new FormControl('', [Validators.required]),
      process: new FormControl(''),
      ibRelleuProject: new FormControl(''),
      cedentProject: new FormControl(''),
      mainSector: new FormControl(''),
      mainActivity: new FormControl(''),

      zipCode: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      localizationCity: new FormControl({ value: '', disabled: true }),
      councilCity: new FormControl({ value: '', disabled: true }),
      localizationCCAA: new FormControl({ value: '', disabled: true }),
      consultor: new FormControl('', [Validators.required]),
      delegation: new FormControl(''),

      transferDate: new FormControl('', [Validators.required]),
      contractTypology: new FormControl(''),
      transferPrice: new FormControl(''),
      propertyValue: new FormControl(''),
      propertySelled: new FormControl(''),
      paymentType: new FormControl(''),
      paymentTypology: new FormControl(''),
      agreement: new FormControl(''),
      hiringWorkersNumber: new FormControl(''),
      savedWorkersNumber: new FormControl(''),
      entrepreneurialWorkersNumber: new FormControl(''),
      totalWorkers: new FormControl({ value: '-', disabled: true }),
    });
    this.getAllZipCodes();
    this.loadIbRelleuTypology();
    this.loadSectorList();
    this.loadActivityList();
    this.loadConsultantAndDelegationInfo();
    this.loadContractTypology();
    this.loadTransmissionTypology();
    this.loadPaymentType();
    this.loadPaymentTypology();

    // this.theForm.statusChanges.subscribe((newStaus) => {
    //   console.log('form Status changed event');
    //   console.log(newStaus, this.theForm.pristine, this.theForm.invalid);
    // });
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentSuccessStoryTab');
    this.filteredOptions = this.theForm.get('zipCode').valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
    this.theForm.get('id').setValue(this.id);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.theForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  get f(): { [key: string]: AbstractControl } {
    console.log(this.theForm.status);
    return this.theForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.theForm.invalid) {
      return;
    }
    console.log(this.theForm.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  getAllZipCodes() {
    this.dataService.getAllZipCodes().subscribe((zpCodes: ZipCodesIBDTO[]) => {
      this.zipCodeList = zpCodes;
      this.options = zpCodes;
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

  loadSectorList() {
    this.dataService.getAllSectors().subscribe((sectors) => {
      this.sectorList = sectors;
    });
  }

  loadActivityList() {
    this.dataService.getAllActivities().subscribe((activities) => {
      this.activityList = activities;
    });
  }

  loadIbRelleuTypology() {
    this.dataService
      .getAllIbRelleuTypologies()
      .subscribe((ibRelleuTypology) => {
        this.ibRelleuTypologyList = ibRelleuTypology;
      });
  }

  loadContractTypology() {
    this.dataService
      .getAllContractTypologies()
      .subscribe((contractTypology) => {
        this.contractTypologyList = contractTypology;
      });
  }

  loadTransmissionTypology() {
    this.dataService
      .getAllTransmissionTypologies()
      .subscribe((transmissionTypology) => {
        this.transmissionTypologyList = transmissionTypology;
      });
  }

  loadPaymentType() {
    this.dataService.getAllPaymentType().subscribe((paymentType) => {
      this.paymentTypeList = paymentType;
    });
  }

  loadPaymentTypology() {
    this.dataService.getAllPaymentTypology().subscribe((paymentTypology) => {
      this.paymentTypologyList = paymentTypology;
    });
  }

  selectedValue(event: any) {
    // console.log ("zp seleccionado: ", this.theForm.get('zipCode').value, this.theForm.get('zipCode').value.length)
    this.theForm
      .get('localizationCity')
      .setValue(this.theForm.get('zipCode').value['town']);
    this.theForm
      .get('councilCity')
      .setValue(this.theForm.get('zipCode').value['council']);
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

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem('currentSuccessStoryTab', event.index.toString());
  }

  calculateTotalWorkers(event: any) {
    let hiringWorkersNumber = this.theForm.get('hiringWorkersNumber').value;
    let savedWorkersNumber = this.theForm.get('savedWorkersNumber').value;
    let entrepreneurialWorkersNumber = this.theForm.get(
      'entrepreneurialWorkersNumber'
    ).value;

    let totalWorkers =
      hiringWorkersNumber + savedWorkersNumber + entrepreneurialWorkersNumber;

    this.theForm.get('totalWorkers').setValue(totalWorkers);
  }
}
