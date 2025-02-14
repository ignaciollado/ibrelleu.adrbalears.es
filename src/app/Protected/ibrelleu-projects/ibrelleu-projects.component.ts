import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../Services/data.service';

import {
  IBRelleuProjectsDTO,
  ibrelleuProjectColumns,
} from '../../Models/ibrelleuproject.dto';

@Component({
  selector: 'adr-ibrelleu-projects',
  templateUrl: './ibrelleu-projects.component.html',
  styleUrl: './ibrelleu-projects.component.scss',
})
export class IbrelleuProjectsComponent {
  columnsDisplayed: string[] = ibrelleuProjectColumns.map((col) => col.key);
  dataSource = new MatTableDataSource()
  columnsSchema: any = ibrelleuProjectColumns

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private dataService: DataService) {
    this.loadAllIbrelleuProjects()
    this.dataSource.paginator = this.paginator
  }

  loadAllIbrelleuProjects() {
    this.dataService
      .getAllIbRelleuProjects()
      .subscribe((projects: IBRelleuProjectsDTO[]) => {
        this.dataSource.data = projects
        this.dataSource.paginator = this.paginator
      });
  }
}