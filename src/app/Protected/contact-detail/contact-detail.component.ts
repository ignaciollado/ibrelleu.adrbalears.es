import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { DataService } from '../../Services/data.service';
import { map, Observable, startWith } from 'rxjs';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'adr-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})

export class ContactDetailComponent implements CanComponentDeactivate {
  id:string = this.route.snapshot.paramMap.get('id');
  selectedIndex: number
  perfilTecnicoItems_es = ['Reemprendedor', 'Cedente', 'Externo', 'Usuario de servicio PH/REC']
  perfilTecnicoItems_ca = ['Reemprenedor', 'Cedent', 'Extern', 'Usuari de serveis PH/REC']

  estadoContacto_es = ['Pendiente de contactar', 'Activo', 'Volver a contactar', 'Cita programada', 'Cancelado']
  estadoContacto_ca = ['Pendent de contactar', 'Actiu', 'Tornar a contactar', 'Cita programada', 'Cancel·lat']

  timeFrame_es = ['Mañana', 'Tarde', 'Todo el día']
  timeFrame_ca = ['Matí', 'Tarda', 'Tot el día']

  expandedIndex = 0
  isElevated: boolean = true
  theForm: FormGroup
  countries: CountriesDTO[] = []
  zipCodeList: ZipCodesIBDTO[] = []
  employmentStatusList: any[] = []
  levelOfEducationList: any[] = []
  workingModeList: any[] = []
  filteredOptions: Observable<ZipCodesIBDTO[]>
  options: ZipCodesIBDTO[] = []

  constructor( private dataService: DataService, private countriesService: CountriesService,     private route: ActivatedRoute) {
    this.theForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      nacionalidad: new FormControl(''),
      perfilTecnicoCedente: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required]),
      estadoContacto: new FormControl('', [Validators.required]),
      genero: new FormControl(''),
      motivoEstado: new FormControl(''),
      consultor: new FormControl('', [Validators.required]),
      aceptaRGPD: new FormControl(''),
      delegacion: new FormControl(''),
      prefijo: new FormControl(''),
      mainPhone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      mainMail: new FormControl('', [Validators.required, Validators.email]),
      secondaryPhone: new FormControl('', [ Validators.minLength(9), Validators.maxLength(9)]),
      secondaryMail: new FormControl('', [ Validators.email]),
      contactingComments: new FormControl(''),
      socialNetTwitter: new FormControl(''),
      socialNetLinkedIn: new FormControl(''),
      socialNetFacebook: new FormControl(''),
      localizationAddress: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      zipCode: new FormControl('', [Validators.minLength(5), Validators.maxLength(5)]),
      localizationCity: new FormControl({value:'', disabled: true}),
      councilCity: new FormControl({value:'', disabled: true}),
      localizationCCAA: new FormControl({value:'', disabled: true}),
      localizationCountry: new FormControl ({value:'España', disabled: true}),
      employmentStatus: new FormControl(''),
      levelOfEducation: new FormControl(''),
      workingMode: new FormControl('')
    })
    
    this.getCountries()
    this.getAllZipCodes()
    this.getEmployementStatusList()
    this.getLevelOfEducationList()
    this.getWorkingModes()
  }

  ngOnInit() {
      this.selectedIndex = +sessionStorage.getItem("currentContactTab")
      this.filteredOptions = this.theForm.get('zipCode').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean { 
    if (this.theForm.dirty) 
      { return confirm('You have unsaved changes. Do you really want to leave?'); } 
    return true;
  }

  getCountries() {
    this.countriesService.getAll()
      .subscribe((countries:CountriesDTO[])=> {
        this.countries = countries
    })
  }

  getEmployementStatusList() {
    this.dataService.getAllEmployementsStatus()
      .subscribe((employStatus:any[])=> {
        this.employmentStatusList = employStatus
      })
  }

  getLevelOfEducationList() {
    this.dataService.getAllLevelsOfEducation()
      .subscribe((levelOFEd:any[])=> {
        this.levelOfEducationList = levelOFEd
      })
  }

  getWorkingModes() {
    this.dataService.getAllWorkingModes()
      .subscribe((workingMode:any[])=> {
        this.workingModeList = workingMode
      })
  }

  onSubmit() {
    console.log(this.theForm.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem("currentContactTab",event.index.toString())
  }

  onFileSelected(e:Event) {
    console.log (e)
  }

  getAllZipCodes() {
    this.dataService.getAllZipCodes()
      .subscribe((zpCodes:ZipCodesIBDTO[])=> {
        this.zipCodeList = zpCodes
        this.options = zpCodes
      })
  }

  selectedValue(event: any) {
    console.log ("zp seleccionado: ", this.theForm.get('zipCode').value)
    this.theForm.get('localizationCity').setValue(this.theForm.get('zipCode').value['town'])
    this.theForm.get('localizationCCAA').setValue(this.theForm.get('zipCode').value['island'])
  }

  displayFn(zpCode: ZipCodesIBDTO): string {
    return zpCode && zpCode.zipCode ? zpCode.zipCode : '';
  }

  private _filter(name: string): ZipCodesIBDTO[] {
    const filterValue = name;
    return this.options.filter(option => option.zipCode.includes(filterValue));
  }
}
