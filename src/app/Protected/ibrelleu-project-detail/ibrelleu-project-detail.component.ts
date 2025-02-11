import { Component } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { GrantorProjectsDTO } from '../../Models/grantor-project.dto';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';

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
  delegationList: string[] = [];
  activityList: any[] = [];
  sectorList: any[] = [];

  projectStatusList: any[] = [
    { value: '282310000', label: 'Active' },
    { value: '282310001', label: 'Cancelled' },
    { value: '282310002', label: 'Standby' },
    // Este estado aparece como display none en Reempresa
    // {"value": "282310003",
    //   "label": "Finalizado",
    //   "label_ca": "Finalitzat"
    // }
  ];

  projectCancelReasons: any[] = [
    {
      value: '121370000',
      label: 'noBusinessInterested',
    },
    {
      value: '121370001',
      label: 'newBusinessCreation',
    },
  ];

  knowWaysList: any[] = [];

  ambitos: any[] = [
    {
      value: '282310000',
      label: 'town',
    },
    {
      value: '282310001',
      label: 'comarca',
    },
    {
      value: '282310002',
      label: 'província',
    },
    {
      value: '282310003',
      label: 'CCAA',
    },
  ];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.ibrelleuProjectForm = new FormGroup({});

    this.loadKnowWays();
    this.loadDelegationAndConsultant();
    this.loadSectorInfo();
    this.loadActivityInfo();
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentIbrelleuProjectTab');
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
}
