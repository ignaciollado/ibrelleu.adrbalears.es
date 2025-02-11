import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { DataService } from '../../Services/data.service';
import { ContactService } from '../../Services/contact.service';
import { map, Observable, startWith } from 'rxjs';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CustomValidatorsService } from '../../Services/custom-validators.service';
import { ContactDTO } from '../../Models/contact.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'adr-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss',
})
export class ContactDetailComponent implements CanComponentDeactivate {
  id: string = this.route.snapshot.paramMap.get('id');
  selectedIndex: number;
  perfilTecnicoItems = [
    'reenterprise',
    'grantorContact',
    'external',
    'PH/RECuser',
  ];
  // perfilTecnicoItems_es = [
  //   'Reemprendedor',
  //   'Cedente',
  //   'Externo',
  //   'Usuario de servicio PH/REC',
  // ];
  // perfilTecnicoItems_ca = [
  //   'Reemprenedor',
  //   'Cedent',
  //   'Extern',
  //   'Usuari de serveis PH/REC',
  // ];
  /*  estadoContacto_es = [
    'Pendiente de contactar',
    'Activo',
    'Volver a contactar',
    'Cita programada',
    'Cancelado',
  ];
  estadoContacto_ca = [
    'Pendent de contactar',
    'Actiu',
    'Tornar a contactar',
    'Cita programada',
    'Cancel·lat',
  ]; */

  // timeFrame_es = ['Mañana', 'Tarde', 'Todo el día'];
  // timeFrame_ca = ['Matí', 'Tarda', 'Tot el día'];

  timeFrames = ['morning', 'afternoon', 'allDay'];

  expandedIndex = 0;
  isElevated: boolean = true;
  theForm: FormGroup;
  countries: CountriesDTO[] = [];
  zipCodeList: ZipCodesIBDTO[] = [];
  employmentStatusList: any[] = [];
  levelOfEducationList: any[] = [];
  workingModeList: any[] = [];
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];

  consultantList: string[] = [];
  delegationList: string[] = [];

  constructor(
    private dataService: DataService,
    private contactService: ContactService,
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private customValidators: CustomValidatorsService
  ) {
    this.theForm = new FormGroup({
      // Información del contacto
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [
        Validators.required,
        this.customValidators.dniNieCifValidator(),
      ]),
      dob: new FormControl('', [Validators.required]),
      genero: new FormControl(''),
      nacionalidad: new FormControl(''),
      perfilTecnicoCedente: new FormControl('', [Validators.required]),
      estadoContacto: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required]),
      consultor: new FormControl('', [Validators.required]),
      delegacion: new FormControl(''),
      motivoEstado: new FormControl(''),

      // Datos del contacto
      mainPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]{9}'),
      ]),
      mainMail: new FormControl('', [Validators.required, Validators.email]),
      secondaryPhone: new FormControl('', [
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]{9}'),
      ]),
      secondaryMail: new FormControl('', [Validators.email]),
      professionalPhone: new FormControl('', [Validators.pattern('^[0-9]{9}')]),
      contactTimePreference: new FormControl(''),
      contactingComments: new FormControl(''),

      // Localización
      localizationAddress: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      zipCode: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      localizationCity: new FormControl({ value: '', disabled: true }),
      councilCity: new FormControl({ value: '', disabled: true }),
      localizationCCAA: new FormControl({ value: '', disabled: true }),
      localizationCountry: new FormControl({ value: 'España', disabled: true }),

      // Información laboral y curricular
      employmentStatus: new FormControl(''),
      levelOfEducation: new FormControl(''),
      workingMode: new FormControl(''),
      formationObservations: new FormControl(''),
      businessFormationCheck: new FormControl(''),
      businessTypology: new FormControl({ value: '', disabled: true }),
      experienceAreas: new FormControl({ value: '', disabled: true }),
      experienceAndFormation: new FormControl(''),
    });

    this.getCountries();
    this.getAllZipCodes();
    this.getEmployementStatusList();
    this.getLevelOfEducationList();
    this.getWorkingModes();
    this.loadConsultantAndDelegationInfo();
    this.getContactById(+this.id);
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentContactTab');
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

  getCountries() {
    this.countriesService.getAll().subscribe((countries: CountriesDTO[]) => {
      this.countries = countries;
    });
  }

  getEmployementStatusList() {
    this.dataService
      .getAllEmployementsStatus()
      .subscribe((employStatus: any[]) => {
        this.employmentStatusList = employStatus;
      });
  }

  getLevelOfEducationList() {
    this.dataService.getAllLevelsOfEducation().subscribe((levelOFEd: any[]) => {
      this.levelOfEducationList = levelOFEd;
    });
  }

  getWorkingModes() {
    this.dataService.getAllWorkingModes().subscribe((workingMode: any[]) => {
      this.workingModeList = workingMode;
    });
  }

  loadConsultantAndDelegationInfo() {
    this.dataService.getAllContacts().subscribe((contactList: ContactDTO[]) => {
      contactList.forEach((contact) => {
        this.insertConsultantData(contact.consultant);
        this.insertDelegationData(contact.delegation);
      });
    });
  }

  getContactById(id: number) {
    this.contactService.getContactById(id).subscribe(
      (contact: ContactDTO) => {
        this.theForm.patchValue({
          nombre: contact.firstName,
          apellidos: contact.lastName,
          dni: contact.dni,
          dob: contact.dob,
          genero: contact.gender,
          nacionalidad: contact.nationality,
          perfilTecnicoCedente: contact.technical_profile,
          estadoContacto: contact.contact_status,
          perfil: contact.userProfile,
          /* consultor: contact.consultor, */
          /* delegacion: contact.delegacion, */
          /*  motivoEstado: contact.motivoEstado, */
          mainPhone: contact.mainPhone,
          mainMail: contact.mainMail,
          secondaryPhone: contact.secondary_phone,
          secondaryMail: contact.secondary_email,
          /*  professionalPhone: contact.professionalPhone, */
          /* contactTimePreference: contact.contactTimePreference, */
          /* contactingComments: contact.contactingComments, */
          localizationAddress: contact.localizationAddress,
          zipCode: contact.zipCode,
          localizationCity: contact.town,
          councilCity: contact.council,
          localizationCCAA: contact.localizationCCAA,
          localizationCountry: contact.country,
          /* employmentStatus: contact.employmentStatus, */
          /* levelOfEducation: contact.levelOfEducation, */
          /* workingMode: contact.workingMode, */
          /*  formationObservations: contact.formationObservations, */
          /* businessFormationCheck: contact.businessFormationCheck, */
          /* businessTypology: contact.businessTypology, */
          /* experienceAreas: contact.experienceAreas, */
          /* experienceAndFormation: contact.experienceAndFormation */
        });
        this.showSnackBar('Contact retrieved successfully!!!');
      },
      (error) => {
        this.showSnackBar(error);
      }
    );
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

  onSubmit() {
    console.log(this.theForm.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem('currentContactTab', event.index.toString());
  }

  onFileSelected(e: Event) {
    console.log(e);
  }

  getAllZipCodes() {
    this.dataService.getAllZipCodes().subscribe((zpCodes: ZipCodesIBDTO[]) => {
      this.zipCodeList = zpCodes;
      this.options = zpCodes;
    });
  }

  selectedValue(event: any) {
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

  deleteDni(event: any) {
    let dniValue = this.theForm.get('dni').value;

    if (dniValue != '' && dniValue.length != 9 && dniValue.length != 0) {
      this.theForm.get('dni').setValue('');
    }
  }

  afterCheckChanges(event: any, checkName: string, checkFormName: string[]) {
    let checkValue = this.theForm.get(checkName).value;
    this.changeEnable(checkFormName, checkValue);
  }

  changeEnable(afterCheckForms: any[], check: boolean) {
    afterCheckForms.forEach((form) => {
      if (check) {
        this.theForm.get(form).enable();
      } else {
        this.theForm.get(form).disable();
      }
    });
  }

  private showSnackBar(error: string): void {
    this.snackBar.open(error, 'X', {
      duration: 10000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'],
    });
  }
}
