import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../Services/data.service';
import { InterestDTO } from '../../Models/interest.dto';
import { GrantorProjectsDTO } from '../../Models/grantorProject.dto';
import { IBRelleuProjectsDTO } from '../../Models/ibrelleuproject.dto';

@Component({
  selector: 'adr-interest-detail',
  templateUrl: './interest-detail.component.html',
  styleUrl: './interest-detail.component.scss'
})
export class InterestDetailComponent {
  selectedIndex: number;
  interestForm: FormGroup
  id: string = this.route.snapshot.paramMap.get('id')

  grantorProjectsConsultants: string[] = [];
  ibrelleuProjectsConsultants: string[] = [];

  interestStatusList: any[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.interestForm = new FormGroup({
      dataGeneracio: new FormControl(''),
      estatInteres: new FormControl(''),
      comentari: new FormControl(''),
      contacte: new FormControl(''),
      telefonContacte: new FormControl(''),
      correuContacte: new FormControl(''),
      projecteReempresaInteressat: new FormControl(''),
      consultorContacteInteressat: new FormControl(''),
      delegacioInteressat: new FormControl(''),
      telefonConsultorInteressat: new FormControl(''),
      correuConsultorInteressat: new FormControl(''),
      anunci: new FormControl(''),
      projecteCedentDesitjat: new FormControl(''),
      consultorProjecteDesitjat: new FormControl(''),
      delegacioProjecteDesitjat: new FormControl(''),
      telefonConsultorDesitjat: new FormControl(''),
      correuConsultorDesitjat: new FormControl(''),
      comentariDerivacio: new FormControl(''),
      enviarInteres: new FormControl(''),




    })
    this.loadInterestStatus()
    this.loadConsultants()
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentInterestTab')
    this.dataService.getAllInterests().subscribe((interestsList: InterestDTO[]) => {
      let targetInterest = interestsList.find((interest => interest.id.toString() === this.id))
      this.loadInterestFormInfo(targetInterest)
    })
  }


  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.interestForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit() {
    console.log(this.interestForm.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem('currentInterestTab', event.index.toString());
  }

  loadInterestStatus() {
    this.dataService.getAllInterestsStatus().subscribe((statusList: any[]) => {
      this.interestStatusList = statusList
    })
  }

  loadConsultants() {
    this.dataService.getAllIbRelleuProjects().subscribe((ibrelleuProjects: IBRelleuProjectsDTO[]) => {
      ibrelleuProjects.forEach(ibrelleuProject => {
        if (!this.ibrelleuProjectsConsultants.includes(ibrelleuProject.consultor)) {
          this.ibrelleuProjectsConsultants.push(ibrelleuProject.consultor)
        }
      });
    })
    this.dataService.getAllGrantorProjects().subscribe((grantorProjects: GrantorProjectsDTO[]) => {
      grantorProjects.forEach(grantorProject => {
        if (!this.grantorProjectsConsultants.includes(grantorProject.consultor)) {
          this.grantorProjectsConsultants.push(grantorProject.consultor)
        }
      })
    })
  }

  loadInterestFormInfo(interest: InterestDTO) {
    this.interestForm.patchValue({
      dataGeneracio: interest.dataGeneracio,
      estatInteres: interest.estatInteres,
      comentari: interest.comentari,
      contacte: interest.contacte,
      telefonContacte: interest.telefonContacte,
      correuContacte: interest.correuContacte,
      projecteReempresaInteressat: interest.projecteReempresaInteressat,
      consultorContacteInteressat: interest.consultorContacteInteressat,
      delegacioInteressat: interest.delegacioInteressat,
      telefonConsultorInteressat: interest.telefonConsultorInteressat,
      correuConsultorInteressat: interest.correuConsultorInteressat,
      anunci: interest.anunci,
      projecteCedentDesitjat: interest.projecteCedentDesitjat,
      consultorProjecteDesitjat: interest.consultorProjecteDesitjat,
      delegacioProjecteDesitjat: interest.delegacioProjecteDesitjat,
      telefonConsultorDesitjat: interest.telefonConsultorDesitjat,
      correuConsultorDesitjat: interest.correuConsultorDesitjat,
      comentariDerivacio: interest.comentariDerivacio,
      enviarInteres: interest.enviarInteres
    })
  }
}
