import { Component } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { GrantorProjectsDTO } from '../../Models/grantorProject.dto';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';

@Component({
  selector: 'adr-grantor-project-detail',
  templateUrl: './grantor-project-detail.component.html',
  styleUrl: './grantor-project-detail.component.scss',
})
export class GrantorProjectDetailComponent {
  id: string | null = this.route.snapshot.paramMap.get('id');
  grantorProjectForm: FormGroup;
  selectedIndex: number;
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];
  zipCodeList: ZipCodesIBDTO[] = [];

  knowWaysList: any[] = [];

  consultantList: string[] = [];

  sectorList: any[] = [];
  activityList: any[] = [];

  cessionReasonsList: any[] = [];
  intervalList: any[] = [];
  propertyStatusList: any[] = [];

  /* Permite validar que la fecha del inicio de la actividad no sea superior 
  al año actual. ¿Es posible que una empresa que cede haya empezado su actividad
  en años posteriores?*/
  date = new Date();
  actualYear = this.date.getFullYear();

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.grantorProjectForm = new FormGroup({
      projectName: new FormControl(''),
      entryDate: new FormControl(''),
      sameContactOwner: new FormControl(''),
      ownerName: new FormControl(''),
      projectContactName: new FormControl(''),
      projectAccount: new FormControl(''),
      howKnowUs: new FormControl(''),
      projectStatus: new FormControl(''),
      cancelReason: new FormControl(''),
      stanbyReason: new FormControl(''),
      delegation: new FormControl(''),
      consultant: new FormControl(''),
      projectStatusObservations: new FormControl(''),
      activeBusiness: new FormControl(''),
      localTypology: new FormControl(''),
      transferType: new FormControl(''),
      startYear: new FormControl(''),

      activitySameLocationAccount: new FormControl(''),
      municipalMarketUbication: new FormControl(''),
      municipalFacilityType: new FormControl(''),
      facilityName: new FormControl(''),
      specifyTypeFacility: new FormControl(''),
      address: new FormControl(''),
      district: new FormControl(''),
      zipCode: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      localizationCity: new FormControl({ value: '', disabled: true }),
      councilCity: new FormControl({ value: '', disabled: true }),
      localizationCCAA: new FormControl({ value: '', disabled: true }),
      localizationCountry: new FormControl({ value: 'España', disabled: true }),
      noDifusion: new FormControl(''),
      propertyStatus: new FormControl(''),
      localSize: new FormControl(''),
      localContractConditions: new FormControl(''),
      localSellSubject: new FormControl(''),
      anotherLocalSpecifications: new FormControl(''),

      cessionReason: new FormControl(''),
      lastDateCession: new FormControl(''),
      cessionReasonDescription: new FormControl(''),
      partnerAutorization: new FormControl(''),
      cessionPriceInterval: new FormControl(''),
      cessionPlan: new FormControl(''),
      variationPrice: new FormControl(''),
      dateVariation: new FormControl(''),
      cessionPrice: new FormControl(''),
      ibrelleuValorationInterest: new FormControl(''),
      valorationAspects: new FormControl(''),
      lastFiscalYearValoration: new FormControl(''),
      valorationStatus: new FormControl(''),
      externalValoration: new FormControl(''),
      metodsValorationExternalDescription: new FormControl(''),
      cessionOfferDetails: new FormControl(''),
      cessionOfferDetailsDescription: new FormControl(''),
      externalProfessionalName: new FormControl(''),
      cessionStepsDone: new FormControl(''),
      externalProfessionalMail: new FormControl(''),
      externalProfessionalPhone: new FormControl(''),
      externalIBRelleuContact: new FormControl(''),
      desiredIBRelleuProfile: new FormControl(''),

      activityCessionSameAccount: new FormControl(''),
      mainSector: new FormControl(''),
      mainActivity: new FormControl(''),
      paradaMarketNoSedentary: new FormControl(''),
      cessionActivityDescription: new FormControl(''),
      companyCarrerAndStrategy: new FormControl(''),
      marketDescription: new FormControl(''),
      clientsTypology: new FormControl(''),
      clientsDescription: new FormControl(''),
      suppliersDescription: new FormControl(''),
      competencyDescription: new FormControl(''),
      productCheck: new FormControl(''),
      brandCheck: new FormControl(''),
      productServiceDescription: new FormControl(''),
      brandsNames: new FormControl(''),
      renovationTrademarkName: new FormControl(''),
      stockCheck: new FormControl(''),
      auditoryCheck: new FormControl(''),
      activityLicenseCheck: new FormControl(''),
      companyAdvantages: new FormControl(''),
      companyDisadvantages: new FormControl(''),
      exportCheck: new FormControl(''),
      exportGeograficAmbit: new FormControl(''),
      exportDescription: new FormControl(''),
      importCheck: new FormControl(''),
      importGeograficAmbit: new FormControl(''),
      importDescription: new FormControl(''),
      fullTimeWorkers: new FormControl(''),
      partialTimeWorkers: new FormControl(''),
      totalWorkers: new FormControl(''),
      workersAntiquity: new FormControl(''),
      salaryComments: new FormControl(''),
      collaborationComments: new FormControl(''),
      workersObservations: new FormControl(''),
      stayWorkersAfterCession: new FormControl(''),
      workersKnowSituation: new FormControl(''),

      lastFiscalYearFacturation: new FormControl(''),
      lastFiscalYearResults: new FormControl(''),
      commentsLastFiscalYearResults: new FormControl(''),
      LastFiscalYearEBITDA: new FormControl(''),
      oneYearAgoFacturation: new FormControl(''),
      oneYearAgoResults: new FormControl(''),
      commentsOneYearAgoResults: new FormControl(''),
      oneYearAgoEBITDA: new FormControl(''),
      twoYearsAgoFacturation: new FormControl(''),
      twoYearsAgoResults: new FormControl(''),
      commentsTwoYearsAgoResults: new FormControl(''),
      twoYearsAgoEBITDA: new FormControl(''),

      documentationActivityLicense: new FormControl(''),
      documentation190IRPF: new FormControl(''),
      documentationRentContract: new FormControl(''),
      documentationRNTorRLC: new FormControl(''),
      documentation347CustomersSuppliers: new FormControl(''),
      documentation130or131IRPF: new FormControl(''),
      documentationActivitAccountability: new FormControl(''),
      documentationAnualIVA390: new FormControl(''),
      documentation100IRPF: new FormControl(''),
      documentationLostGains: new FormControl(''),
      documentationCopyCifCompany: new FormControl(''),
      documentationConstitutionScriptures: new FormControl(''),
      documentationSocietyTax200: new FormControl(''),
      documentationSocietyScriptures: new FormControl(''),
      documentationSituationBalance: new FormControl(''),
      documentationAdministrativeConcession: new FormControl(''),
      documentationObservations: new FormControl('')


    });

    this.loadKnowWays();
    this.loadConsultant();
    this.getAllZipCodes();
    this.loadSectorInfo();
    this.loadActivityInfo();
    this.loadCessionReasons();
    this.loadIntervalInfo();
    this.loadPropertyStatus();
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

    if (this.id) {
      this.dataService.getAllGrantorProjects().subscribe((grantorProjects: GrantorProjectsDTO[]) => {
        let targetProject = grantorProjects.find(grantorProject => grantorProject.id.toString() === this.id)
        this.loadProjectFormInfo(targetProject)
      })
    }
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

  loadConsultant() {
    this.dataService
      .getAllGrantorProjects()
      .subscribe((grantorProjectsList: GrantorProjectsDTO[]) => {
        grantorProjectsList.forEach((project) => {
          this.insertData(project.consultor);
        });
      });
  }

  insertData(consultant?: string) {
    if (consultant && !this.consultantList.includes(consultant)) {
      this.consultantList.push(consultant);
    }
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

  loadCessionReasons() {
    this.dataService.getAllCessionReasons().subscribe((cessionReasons: any[]) => {
      this.cessionReasonsList = cessionReasons
    })
  }

  loadIntervalInfo() {
    return this.dataService.getAllTransferPriceInterval().subscribe((intervals: any[]) => {
      this.intervalList = intervals
    })
  }

  loadPropertyStatus() {
    return this.dataService.getAllPropertyStatus().subscribe((statusList: any[]) => {
      this.propertyStatusList = statusList;
    })
  }

  loadProjectFormInfo(project: GrantorProjectsDTO) {
    this.grantorProjectForm.patchValue({
      projectName: project.nomProjecte,
      entryDate: project.dataEntrada,
      sameContactOwner: project.esPropietariContacte,
      ownerName: project.personaPropietaria,
      projectAccount: project.compte,
      howKnowUs: project.coneixement,
      projectStatus: project.estatProjecte,
      cancelReason: project.motiuEstatCancelat,
      delegation: project.delegacio,
      consultant: project.consultor,
      projectStatusObservations: project.observacionsEstat,
      transferType: project.tipusCessio,
      startYear: project.anyIniciActivitat,
      activitySameLocationAccount: project.mateixaLocalitzacioCompte,
      municipalMarketUbication: project.mercatMunicipal,
      municipalFacilityType: project.tipusInstalacioMunicipal,
      facilityName: project.nomInstalacio,
      specifyTypeFacility: project.especificarInstalacio,
      address: project.adreca,
      district: project.districte,
      zipCode: project.codiPostal,
      localizationCity: project.poblacio,
      councilCity: project.comarca,
      localizationCCAA: project.comunitatAutonoma,
      localizationCountry: project.pais,
      noDifusion: project.noDifusioPoblacio,
      propertyStatus: project.localPropietatLloguer,
      localSize: project.superficieLocal,
      localContractConditions: project.condicionsContractuals,
      localSellSubject: project.localNegociVenda,
      anotherLocalSpecifications: project.altresEspecificacionsLocal,
      cessionReason: project.motiuCessio,
      lastDateCession: project.dataMaximaCessio,
      cessionReasonDescription: project.descripcioActivitatCessio,
      partnerAutorization: project.autoritzacioSocis,
      cessionPriceInterval: project.intervalPreuCessio,
      cessionPlan: project.disposaPlaCessio,
      variationPrice: project.variacioPreu,
      dateVariation: project.dataVariacio,
      cessionPrice: project.preuCessio,
      ibrelleuValorationInterest: project.interesValoracioReempresa,
      externalValoration: project.disposaValoracioAliena,
      metodsValorationExternalDescription: project.descripcioMetodesValoracio,
      cessionOfferDetails: Array.isArray(project.detallOfertaCessio) ? project.detallOfertaCessio : [project.detallOfertaCessio],
      externalProfessionalName: project.professionalExtern,
      cessionStepsDone: Array.isArray(project.passesRealitzades) ? project.passesRealitzades : [project.passesRealitzades],
      externalProfessionalMail: project.emailProfessionalExtern,
      externalProfessionalPhone: project.telefonProfessionalExtern,
      externalIBRelleuContact: project.contacteReemprenedoraExterna,
      desiredIBRelleuProfile: project.perfilReemprenedora,
      mainSector: Array.isArray(project.sector1) ? project.sector1 : [project.sector1],
      mainActivity: Array.isArray(project.activitat1) ? project.activitat1 : [project.activitat1],
      paradaMarketNoSedentary: project.paradaMercatNoSedentaria,
      cessionActivityDescription: project.descripcioActivitatCessio,
      marketDescription: project.descripcioMercat,
      clientsTypology: Array.isArray(project.tipologiaClientela) ? project.tipologiaClientela : [project.tipologiaClientela],
      clientsDescription: project.descripcioClientela,
      suppliersDescription: project.descripcioProveidors,
      competencyDescription: project.descripcioCompetencia,
      productCheck: project.productePropi,
      brandCheck: project.marquesPropies,
      productServiceDescription: project.descripcioProducteServei,
      brandsNames: project.nomsMarques,
      renovationTrademarkName: project.renovarNomComercial,
      stockCheck: project.disposaInventari,
      auditoryCheck: project.disposaAuditoria,
      activityLicenseCheck: project.disposaLlicenciaActivitat,
      companyAdvantages: Array.isArray(project.avantatgesEmpresa) ? project.avantatgesEmpresa : [project.avantatgesEmpresa],
      companyDisadvantages: Array.isArray(project.dificultatsEmpresa) ? project.dificultatsEmpresa : [project.dificultatsEmpresa],
      exportCheck: project.exporta,
      exportGeograficAmbit: Array.isArray(project.ambitGeograficExport) ? project.ambitGeograficExport : [project.ambitGeograficExport],
      importCheck: project.importa,
      importGeograficAmbit: Array.isArray(project.ambitGeograficImport) ? project.ambitGeograficImport : [project.ambitGeograficImport],
      fullTimeWorkers: project.jornadaCompleta,
      partialTimeWorkers: project.jornadaParcial,
      totalWorkers: project.numeroTreballadorsTotals,
      salaryComments: project.comentariSalaris,
      collaborationComments: project.comentariAutonomsColaboradors,
      workersObservations: project.observacionsTreballadors,
      stayWorkersAfterCession: project.continuenTreballadorsDespresCessio,
      workersKnowSituation: project.coneixenTreballadorsSituacio,
      lastFiscalYearFacturation: project.facturacioUltimAnyFiscal,
      lastFiscalYearResults: project.resultatUltimAnyFiscal,
      commentsLastFiscalYearResults: project.comentariResultatsUltimAnyFiscal,
      LastFiscalYearEBITDA: project.EBITDAUltimAnyFiscal,
      oneYearAgoFacturation: project.facturacioAnyN1,
      oneYearAgoResults: project.resultatAnyN1,
      commentsOneYearAgoResults: project.comentariResultatsAnyN1,
      oneYearAgoEBITDA: project.EBITDAAnyN1,
      twoYearsAgoFacturation: project.facturacioAnyN2,
      twoYearsAgoResults: project.resultatAnyN2,
      commentsTwoYearsAgoResults: project.comentariResultatsAnyN2,
      twoYearsAgoEBITDA: project.EBITDAAnyN2,
    })
  }
}
