import { Component } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { GrantorProjectsDTO } from '../../Models/grantor-project.dto';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';

@Component({
  selector: 'adr-grantor-project-detail',
  templateUrl: './grantor-project-detail.component.html',
  styleUrl: './grantor-project-detail.component.scss',
})
export class GrantorProjectDetailComponent {
  id: string = this.route.snapshot.paramMap.get('id');
  grantorProjectForm: FormGroup;
  selectedIndex: number;
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];
  zipCodeList: ZipCodesIBDTO[] = [];

  knowWaysList: any[] = [];
  projectStatusList: any[] = [
    { value: '282310000', label: 'Activo', label_ca: 'Actiu' },
    { value: '282310001', label: 'Cancelado', label_ca: 'Cancel·lat' },
    { value: '282310002', label: 'Standby', label_ca: 'Stanby' },
    // Este estado aparece como display none en Reempresa
    // {"value": "282310003",
    //   "label": "Finalizado",
    //   "label_ca": "Finalitzat"
    // }
  ];

  projectCancelReasons: any[] = [
    {
      value: '121370000',
      label: 'Empresa cerrada',
      label_ca: 'Empresa tancada',
    },
    {
      value: '121370001',
      label: 'Continua con el negocio',
      label_ca: 'Continua amb el negoci',
    },
    {
      value: '121370002',
      label: 'No interesado en continuar en IBRelleu',
      label_ca: 'No interessat en continuar amb IBRelleu',
    },
    { value: '121370003', label: 'ns/nc', label_ca: 'ns/nc' },
  ];

  localTypologyList: any[] = [
    {
      value: '121370000',
      label: 'Parada disponible de Mercado Municipal',
      label_ca: 'Parada disponible de Mercat Municipal',
    },
    {
      value: '121370001',
      label: 'Establecimiento comercial de titularidad municipal disponible',
      label_ca: 'Establiment comercial de titularitat municipal disponible',
    },
    {
      value: '121370002',
      label: 'Concesión administrativa del bar de las instalaciones deportivas',
      label_ca:
        'Concessió administrativa del bar de les instal·lacions esportives',
    },
  ];

  delegationList: string[] = [];
  consultantList: string[] = [];

  cessionTypeList: any[] = [];

  sectorList: any[] = [];
  activityList: any[] = [];

  clientTypologyList: any[] = [];

  continentList: any[] = [];

  /* Permite validar que la fecha del inicio de la actividad no sea superior 
  al año actual. ¿Es posible que una empresa que cede haya empezado su actividad
  en años posteriores?*/
  date = new Date();
  actualYear = this.date.getFullYear();

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.grantorProjectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectCreationDate: new FormControl('', Validators.required),
      sameContactAndOwner: new FormControl(''),
      ownerName: new FormControl('', Validators.required),
      // contactName: new FormControl({ value: '', disabled: true }),
      contactName: new FormControl(''),
      accountName: new FormControl('', Validators.required),
      howKnowUs: new FormControl('', Validators.required),
      projectStatus: new FormControl('', Validators.required),
      cancelReason: new FormControl('', Validators.required),
      delegation: new FormControl('', Validators.required),
      consultant: new FormControl('', Validators.required),
      statusObservation: new FormControl(''),
      activeBusiness: new FormControl(''),
      // localTypology: new FormControl({ value: '', disabled: true }),
      localTypology: new FormControl(''),
      cessionType: new FormControl(''),
      startYear: new FormControl('', [
        Validators.pattern('[0-9]{4}'),
        Validators.min(1850),
        Validators.max(this.actualYear),
      ]),

      // Necesario para el zipCode
      direccion: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      localizationCity: new FormControl({ value: '', disabled: true }),
      councilCity: new FormControl({ value: '', disabled: true }),
      localizationCCAA: new FormControl({ value: '', disabled: true }),
      localizationCountry: new FormControl({ value: 'España', disabled: true }),
    });

    this.loadKnowWays();
    this.loadDelegationAndConsultant();
    this.loadCessionType();
    this.getAllZipCodes();
    this.loadSectorInfo();
    this.loadActivityInfo();
    this.loadClientInfo();
    this.loadContinentInfo();
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentGrantorProjectTab');
    this.filteredOptions = this.grantorProjectForm
      .get('zipCode')
      .valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value;
          return name ? this._filter(name as string) : this.options.slice();
        })
      );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.grantorProjectForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit() {
    console.log('Submit');
  }

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem('currentGrantorProjectTab', event.index.toString());
  }

  loadKnowWays() {
    return this.dataService.getAllKnowWays().subscribe((knowWay) => {
      this.knowWaysList = knowWay;
    });
  }

  loadDelegationAndConsultant() {
    this.dataService
      .getAllGrantorProjects()
      .subscribe((grantorProjectsList: GrantorProjectsDTO[]) => {
        grantorProjectsList.forEach((project) => {
          this.insertData(project.consultant, project.delegation);
        });
      });
  }

  insertData(consultant?: string, delegation?: string) {
    if (consultant && !this.consultantList.includes(consultant)) {
      this.consultantList.push(consultant);
    }

    if (delegation && !this.delegationList.includes(delegation)) {
      this.delegationList.push(delegation);
    }
  }

  loadCessionType() {
    return this.dataService
      .getAllTransmissionTypologies()
      .subscribe((transmissionTypology: any[]) => {
        this.cessionTypeList = transmissionTypology;
      });
  }

  getAllZipCodes() {
    this.dataService.getAllZipCodes().subscribe((zpCodes: ZipCodesIBDTO[]) => {
      this.zipCodeList = zpCodes;
      this.options = zpCodes;

      /*  console.log(this.options); */
    });
  }

  private _filter(name: string): ZipCodesIBDTO[] {
    const filterValue = name;
    return this.options.filter((option) =>
      option.zipCode.includes(filterValue)
    );
  }

  displayFn(zpCode: ZipCodesIBDTO): string {
    return zpCode && zpCode.zipCode ? zpCode.zipCode : '';
  }

  selectedValue(event: any) {
    console.log(
      'zp seleccionado: ',
      this.grantorProjectForm.get('zipCode').value
    );
    this.grantorProjectForm
      .get('localizationCity')
      .setValue(this.grantorProjectForm.get('zipCode').value['town']);
    this.grantorProjectForm
      .get('localizationCCAA')
      .setValue(this.grantorProjectForm.get('zipCode').value['island']);
    this.grantorProjectForm
      .get('councilCity')
      .setValue(this.grantorProjectForm.get('zipCode').value['council']);
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
    this.dataService
      .getAllClientTypologies()
      .subscribe((typologyItems: any[]) => {
        this.clientTypologyList = typologyItems;
      });
  }

  loadContinentInfo() {
    this.dataService.getAllContinents().subscribe((continentItems: any[]) => {
      this.continentList = continentItems;
    });
  }
  // validatorsChangeYesOrNo(
  //   event: any,
  //   trackedFormField: string,
  //   objectiveFormField: string
  // ) {
  //   let value = this.grantorProjectForm.get(trackedFormField).value;
  //   let formField = this.grantorProjectForm.get(objectiveFormField);

  //   if (value == '0') {
  //     formField.addValidators([Validators.required]);
  //     formField.enable();
  //   } else if (value == '1') {
  //     formField.clearValidators();
  //     formField.disable();
  //   }
  //   formField.updateValueAndValidity();
  // }
}
