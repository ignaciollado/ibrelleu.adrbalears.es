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
  id: string | null = this.route.snapshot.paramMap.get('id');
  selectedIndex: number;

  expandedIndex = 0;
  isElevated: boolean = true;
  theForm: FormGroup;
  countries: CountriesDTO[] = [];
  zipCodeList: ZipCodesIBDTO[] = [];
  employmentStatusList: any[] = [];
  levelOfEducationList: any[] = [];
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
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [
        Validators.required,
        this.customValidators.dniNieCifValidator(),
      ]),
      dob: new FormControl('', [Validators.required]),
      genero: new FormControl(''),
      nacionalidad: new FormControl(''),
      perfilTecnicoCedente: new FormControl([Validators.required]),
      estadoContacto: new FormControl('', [Validators.required]),
      userProfile: new FormControl('', [Validators.required]),
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

      secondaryMail: new FormControl('', [Validators.email]),
      secondaryPhone: new FormControl('', [
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]{9}'),
      ]),
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
      island: new FormControl({ value: '', disabled: true }),
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
    this.getLevelOfEducationList();
    this.loadConsultantAndDelegationInfo();
    if (this.id) { this.getContactById(+this.id); }
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


  getLevelOfEducationList() {
    this.dataService.getAllLevelsOfEducation().subscribe((levelOFEd: any[]) => {
      this.levelOfEducationList = levelOFEd;
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
          nacionalidad: Array.isArray(contact.nationality)
            ? contact.nationality
            : [contact.nationality],
          perfilTecnicoCedente: contact.perfilTecnicoCedente,
          estadoContacto: contact.contact_status,
          userProfile: Array.isArray(contact.userProfile)
            ? contact.userProfile
            : [contact.userProfile],
          motivoEstado: contact.state_reason,
          consultor: contact.consultant,
          delegacion: contact.delegation,
          mainPhone: contact.mainPhone,
          mainMail: contact.mainMail,
          secondaryPhone: contact.secondary_phone,
          secondaryMail: contact.secondary_email,
          professionalPhone: contact.professional_phone,
          contactTimePreference: Array.isArray(contact.preferred_contact_time) ? contact.preferred_contact_time : [contact.preferred_contact_time],
          contactingComments: contact.contact_comments,
          localizationAddress: contact.localizationAddress,
          zipCode: contact.zipCode,
          localizationCity: contact.town,
          councilCity: contact.council,
          island: contact.island,
          employmentStatus: contact.job_status,
          levelOfEducation: Array.isArray(contact.education_level)
            ? contact.education_level
            : [contact.education_level],
          workingMode: contact.self_employed,
          businessFormationCheck: contact.business_management_training,
          businessTypology: Array.isArray(contact.training_type)
            ? contact.training_type
            : [contact.training_type],
          experienceAreas: Array.isArray(contact.experience_areas)
            ? contact.experience_areas
            : [contact.experience_areas],
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
      .get('island')
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
    this.snackBar.open(error, 'Close', {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'],
    });
  }
}
