import { Component } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { IBRelleuProjectsDTO } from '../../Models/ibrelleuproject.dto';

@Component({
  selector: 'adr-ibrelleu-project-detail',
  templateUrl: './ibrelleu-project-detail.component.html',
  styleUrl: './ibrelleu-project-detail.component.scss',
})
export class IbrelleuProjectDetailComponent {
  id: string = this.route.snapshot.paramMap.get('id');
  ibrelleuProjectForm: FormGroup;
  selectedIndex: number;
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];
  zipCodeList: ZipCodesIBDTO[] = [];

  consultantList: string[] = [];
  activityList: any[] = [];
  sectorList: any[] = [];

  knowWaysList: any[] = [];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.ibrelleuProjectForm = new FormGroup({
      projectName: new FormControl(''),
      creationDate: new FormControl(''),
      projectResponsable: new FormControl(''),
      sameResponsableAndContact: new FormControl(''),
      projectContact: new FormControl(''),
      projectAccount: new FormControl(''),

      consultant: new FormControl(''),
      delegation: new FormControl(''),
      projectStatus: new FormControl(''),
      cancelReason: new FormControl(''),
      projectStatusObservation: new FormControl(''),
      howKnowUs: new FormControl(''),

      matchingAutomaticMail: new FormControl(''),
      desiredProfile: new FormControl(''),
      mainSector: new FormControl(''),
      mainActivity: new FormControl(''),
      municipalMarketInterest: new FormControl(''),
      franchiseInterest: new FormControl(''),
      geograficAmbit: new FormControl(''),
      maxWorkersNum: new FormControl(''),
      minWorkersNum: new FormControl(''),
      propertyStatus: new FormControl(''),
      cessionReason: new FormControl(''),

      transferInterval: new FormControl(''),
      partnersAportation: new FormControl(''),
      particularFinancing: new FormControl(''),
      bankFinancing: new FormControl(''),
      unemployeementCap: new FormControl(''),
      otherFinancing: new FormControl(''),
      totalEconomicCapacity: new FormControl(''),

      howReenterprise: new FormControl(''),
      withWho: new FormControl(''),
      reenterpriseReasons: new FormControl(''),
      reenterpriseSteps: new FormControl(''),
      projectAdvantages: new FormControl(''),
      projectDisadvantages: new FormControl(''),
      neededFormation: new FormControl(''),
      maximumDateReenterprise: new FormControl(''),
      grantorContact: new FormControl(''),
      grantorContactDescription: new FormControl(''),
      intermediateContact: new FormControl(''),
      intermediateContactDescription: new FormControl('')

    });


    this.loadKnowWays();
    this.loadConsultant();
    this.loadSectorInfo();
    this.loadActivityInfo();
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentIbrelleuProjectTab');
    this.dataService.getAllIbRelleuProjects().subscribe((projects: IBRelleuProjectsDTO[]) => {
      let targetProject = projects.find(project => project.id.toString() === this.id)
      this.loadProjectFormInfo(targetProject)
    })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.ibrelleuProjectForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit() {
    console.log('Submit');
  }

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem('currentIbrelleuProjectTab', event.index.toString());
  }

  loadConsultant() {
    this.dataService.getAllIbRelleuProjects().subscribe((projects: IBRelleuProjectsDTO[]) => {
      projects.forEach((project) => {
        if (!this.consultantList.includes(project.consultor)) {
          this.consultantList.push(project.consultor)
        }
      })
    })
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

  loadKnowWays() {
    return this.dataService.getAllKnowWays().subscribe((knowWay) => {
      this.knowWaysList = knowWay;
    });
  }

  loadProjectFormInfo(project: IBRelleuProjectsDTO) {
    this.ibrelleuProjectForm.patchValue({
      projectName: project.nomProjecte,
      creationDate: project.dataEntrada,
      projectResponsable: project.responsableProjecte,
      sameResponsableAndContact: project.esResponsableContacte,
      projectAccount: project.compte,
      consultant: project.consultor,
      delegation: project.delegacio,
      projectStatus: project.estatProjecte,
      cancelReason: project.motiuEstatCancelat,
      projectStatusObservation: project.observacionsEstat,
      howKnowUs: project.coneixement,
      matchingAutomaticMail: project.enviarPropostesMatching,
      desiredProfile: project.perfilEmpresaDesitjada,
      mainSector: Array.isArray(project.sectorPrincipal) ? project.sectorPrincipal : [project.sectorPrincipal],
      mainActivity: Array.isArray(project.activitat1) ? project.activitat1 : [project.activitat1],
      municipalMarketInterest: project.interesMercatMunicipal,
      franchiseInterest: project.interesFranquicia,
      geograficAmbit: project.ambitGeografic,
      maxWorkersNum: project.numMaxTreballadors,
      minWorkersNum: project.numMinTreballadors,
      propertyStatus: project.propietatLocal,
      cessionReason: project.motiuCessio,
      transferInterval: project.intervalPreuCessio,
      partnersAportation: project.aportacionsSocis,
      particularFinancing: project.financamentParticular,
      bankFinancing: project.financamentBancari,
      unemployeementCap: project.capitalitzacioAtur,
      otherFinancing: project.financamentAltres,
      totalEconomicCapacity: project.totalCapacitatEconomica,
      howReenterprise: project.comReempren,
      reenterpriseReasons: Array.isArray(project.motiuReemprendre) ? project.motiuReemprendre : [project.motiuReemprendre],
      reenterpriseSteps: Array.isArray(project.passesReemprendre) ? project.passesReemprendre : [project.passesReemprendre],
      projectAdvantages: Array.isArray(project.avantatgesProjecteReempresa) ? project.avantatgesProjecteReempresa : [project.avantatgesProjecteReempresa],
      projectDisadvantages: Array.isArray(project.dificultatsProjecteReempresa) ? project.dificultatsProjecteReempresa : [project.dificultatsProjecteReempresa],
      neededFormation: Array.isArray(project.formacioManca) ? project.formacioManca : [project.formacioManca],
      maximumDateReenterprise: project.dataLimitReemprendre,
      grantorContact: project.contacteEmpresaCedentExterna,
      grantorContactDescription: project.dadesEmpresaCedent,
      intermediateContact: project.contacteIntermediari,
      intermediateContactDescription: project.dadesIntermediari
    })

  }
}
