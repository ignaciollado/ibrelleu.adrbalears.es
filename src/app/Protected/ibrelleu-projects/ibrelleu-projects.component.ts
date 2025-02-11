import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'adr-ibrelleu-projects',
  templateUrl: './ibrelleu-projects.component.html',
  styleUrl: './ibrelleu-projects.component.scss',
})
export class IbrelleuProjectsComponent {
  dataSource = new MatTableDataSource();

  columnsDisplayed: string[];

  columnsSchema: any;

  constructor() {
    this.columnsSchema = [
      {
        key: 'ibrelleuProjectName',
        type: 'url',
      },
      {
        key: 'projectStatus',
        type: 'readOnly',
      },
      {
        key: 'mainSector',
        type: 'readOnly',
      },
      {
        key: 'mainActivity',
        type: 'readOnly',
      },
      {
        key: 'totalEconomicSituation',
        type: 'money',
      },
      {
        key: 'consultant',
        type: 'readOnly',
      },
      {
        key: 'delegation',
        type: 'readOnly',
      },
      {
        key: 'creationDate',
        type: 'date',
      },
    ];

    this.dataSource.data = [
      {
        id: 'PIBR00001',
        ibrelleuProjectName: 'Paquito Chocolatero',
        projectStatus: 'Actiu',
        mainSector: 'Serveis',
        mainActivity: 'Altres',
        totalEconomicSituation: 2000,
        consultant: 'José Luis De Jesús',
        delegation: 'Mallorca',
        creationDate: '10/02/2025',
      },
    ];

    this.columnsDisplayed = this.columnsSchema.map((col: any) => col.key);
  }
}
