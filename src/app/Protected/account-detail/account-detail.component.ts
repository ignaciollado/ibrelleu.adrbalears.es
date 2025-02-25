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
import { CustomValidatorsService } from '../../Services/custom-validators.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'adr-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss',
})
export class AccountDetailComponent implements CanComponentDeactivate {
  isElevated: boolean = true;
  selectedIndex: number;
  theForm: FormGroup;
  countries: CountriesDTO[] = [];
  zipCodeList: ZipCodesIBDTO[] = [];
  legalFormList: any[] = [];
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];
  id: string | null = this.route.snapshot.paramMap.get('id');

  consultantList: string[] = [];

  sectorList: any[] = [];
  activityList: any[] = [];



  constructor(
    private dataService: DataService,
    private countriesService: CountriesService,
    private customValidatorsService: CustomValidatorsService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.theForm = new FormGroup({
      // Identificació
      legalFormat: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      nif: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        this.customValidatorsService.dniNieCifValidator(),
      ]),
      tradeName: new FormControl('', Validators.required),
      paradesMercat: new FormControl(''),
      collaborationCompanys: new FormControl(''),
      councilTitularity: new FormControl(''),
      sportConcessions: new FormControl(''),
      entityTypology: new FormControl(''),
      collaborationActivity: new FormControl(''),
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
      debtsList: new FormControl({ value: '', disabled: true }),
      debtsDescription: new FormControl(
        { value: '', disabled: true },
        Validators.maxLength(1024)
      ),
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
      documentationAnualIVA: new FormControl(''),
      documentation190IRPF: new FormControl(''),
      documentation100IRPF: new FormControl(''),
      documentation130or131IRPF: new FormControl(''),
      documentationCopyCifCompany: new FormControl(''),
      documentationConstitutionScriptures: new FormControl(''),
      documentationSocietyScriptures: new FormControl(''),
      documentationLostGain: new FormControl(''),
      documentationSituationBalance: new FormControl(''),
      documentationSocietyTax200: new FormControl(''),
      documentationMarketRules: new FormControl(''),
      documentationComercialRules: new FormControl(''),
      documentationSportConcessions: new FormControl('')
    });

    this.getCountries();
    this.getAllZipCodes();
    this.loadLegalFormList();
    this.loadConsultants()
    this.loadSectorInfo();
    this.loadActivityInfo();
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentAccountTab');
    this.filteredOptions = this.theForm.get('zipCode').valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );

    // Datos producción
    if (this.id) {
      this.accountService.getAccounts().subscribe((accounts: AccountDTO[]) => {
        let targetAccount = accounts.find(account => account.id.toString() === this.id)
        this.loadFormData(targetAccount)
      })
    }

    // Datos mockeados
    // if (this.id){
    // this.dataService.getAllAccounts().subscribe((accounts: AccountDTO[]) => {
    //   let targetAccount = accounts.find(account => account.id.toString() === this.id)
    //   this.loadFormData(targetAccount)
    // })
    // }


  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.theForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  loadFormData(account: AccountDTO) {
    this.theForm.patchValue({
      // nif: account.documentacioNif,
      paradesMercat: account.gestionaParadesMercat,
      collaborationCompanys: account.empresaEntitatColaboradora,
      councilTitularity: account.gestionaEstablimentsComercials,
      sportConcessions: account.gestionaConcessionsAdministratives,
      activeBusiness: account.empresaEnFuncionament,
      creationYear: account.anyConstitucio,
      direccion: account.adreca,
      zipCode: account.codiPostal,
      localizationCity: account.provincia,
      councilCity: account.comarca,
      localizationCCAA: account.comunitatAutonoma,
      companyEmail: account.correuElectronic,
      companyPhone: account.telefonPrincipal,
      companyWeb: account.web,
      activityDescription: account.descripcioActivitat,
      carrerDescription: account.breuDescripcioTrajectoriaEconomica,
      checkProduct: account.disposaProductePropi,
      descriptionProduct: account.descripcioProducteServei,
      descriptionProductProcess: account.descripcioProcesProductiu,
      brandCheck: account.disposaMarquesPropies,
      brandDescription: account.nomsMarques,
      stockCheck: account.disposaInventari,
      stockDescription: account.descripcioEstatEstoc,
      auditoryCheck: account.disposaAuditoria,
      licenseCheck: account.disposaLlicenciaActivitat,
      marketDescription: account.descripcioMercat,
      targetDescription: account.descripcioClientela,
      typologyClients: account.tipologiaClientela,
      suppliersDescription: account.descripcioProveidors,
      competitionDescription: account.descripcioCompetencia,
      exportCheck: account.exporta,
      exportAmbit: account.ambitGeograficExportacio,
      exportDescription: account.comentariExportacio,
      importCheck: account.importa,
      importAmbit: account.ambitGeograficImportacio,
      importDescription: account.comentariImportacio,
      partnerNumber: account.numeroSocis,
      organizationDescription: account.estructuraEmpresa,
      distributionDescription: account.comentariSocis,
      workingDayDescription: account.comentariGestioDiaADia,
      fullTimeWorkers: account.jornadaComplerta,
      partialTimeWorkers: account.jornadaParcial,
      totalWorkers: account.numeroTreballadorsTotals,
      workersCarrerDescription: account.comentariAntiguitat,
      workersSalaryDescription: account.comentariSalaris,
      colaborationDescription: account.comentariAutonomsColaboradors,
      property: account.localPropietatLloguer,
      rentValue: account.preuLloguer,
      localSize: account.superficieLocal,
      localRentingDescription: account.condicionsContractualsLocal,
      anotherSpecificationsDescription: account.altresEspecificacionsLocal,
      financingDescription: account.comentariFinancamentEmpresa,
      debtsCheck: account.empresaAmbDeutes,
      lastYearFacturation: account.facturacioUltimAnyFiscal,
      lastYearResult: account.resultatUltimAnyFiscal,
      lastYearResultDescription: account.comentariResultatsUltimAnyFiscal,
      lastYearBeforeTaxes: account.ebitdaUltimAnyFiscal,
      oneYearAgoFacturation: account.facturacioAnyN1,
      oneYearAgoResult: account.resultatAnyN1,
      oneYearAgoResultDescription: account.comentariResultatsAnyN1,
      oneYearAgoBeforeTaxes: account.ebitdaAnyN1,
      twoYearAgoFacturation: account.facturacioAnyN2,
      twoYearAgoResult: account.resultatAnyN2,
      twoYearAgoResultDescription: account.comentariResultatsAnyN2,
      twoYearAgoBeforeTaxes: account.ebitdaAnyN2,
      documentationAnualIVA: account.liquidacioIvaModel390,
      documentation190IRPF: account.liquidacioIrpfModel190,
      documentation100IRPF: account.declaracioIrpfModel100,
      documentation130or131IRPF: account.pagamentsCompteIrpfModel130131,
      documentationCopyCifCompany: account.fotocopiaCifEmpresa,
      documentationConstitutionScriptures: account.escripturesConstitucioModificacio,
      documentationSocietyScriptures: account.escripturesPodersSocietat,
      documentationLostGain: account.perduesGuanysUltimsAnys,
      documentationSituationBalance: account.balancSituacioUltimsAnys,
      documentationSocietyTax200: account.impostSocietatsModel200,

      /* Estos campos no tiene una propiedad dentro del modelo, por lo que, o no se
      aplica, o se debe hacer de la siguiente forma. Lo dejo sin comentar para que siga
      realizando el printado*/
      legalFormat: account['forma_juridica'],
      contact: account['contacte_principal'],
      companyName: account['rao_social'],
      nif: account["nif"],
      tradeName: account['nom_comercial'],
      consultor: account["consultor"],
      delegacion: account["delegacio"],
      companySector: Array.isArray(account["sector_principal"]) ? account["sector_principal"] : [account["sector_principal"]],
      companyActivity: Array.isArray(account["activitat_principal"]) ? account["activitat_principal"] : [account["activitat_principal"]],
      // debtsList: 
      // debtsDescription: 
    })

  }

  loadLegalFormList() {
    this.dataService
      .getAllLegalForms()
      .subscribe((legalItems: LegalFormDTO[]) => {
        this.legalFormList = legalItems;
      });
  }

  loadConsultants() {
    this.accountService.getAccounts().subscribe((accounts: AccountDTO[]) => {
      accounts.forEach((account) => {
        this.insertConsultantData(account["consultor"])
      })
    })
  }
  insertConsultantData(consultant: string) {
    if (!this.consultantList.includes(consultant)) {
      this.consultantList.push(consultant);
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


  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem('currentAccountTab', event.index.toString());
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

  // He implementado esta lógica como nexo a las llamadas de los métodos que realizan los cambios
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

  deleteNif(event: any) {
    let nifValue = this.theForm.get('nif').value;

    if (nifValue != '' && nifValue != null && nifValue.length != 9 && nifValue.length != 0) {
      this.theForm.get('nif').setValue('');
    }
  }

  checkPropertyStatus(event: any) {
    let rentValue = this.theForm.get('rentValue');
    let propertyValue = this.theForm.get('property').value

    switch (propertyValue == '282310001') {
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
}
