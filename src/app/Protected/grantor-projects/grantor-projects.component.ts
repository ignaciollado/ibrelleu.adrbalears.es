import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  grantorProjectColumns,
  GrantorProjectsDTO,
} from '../../Models/grantor-project.dto';

@Component({
  selector: 'adr-grantor-projects',
  templateUrl: './grantor-projects.component.html',
  styleUrl: './grantor-projects.component.scss',
})
export class GrantorProjectsComponent {
  ambitos: string[] = ['AUTONÓMICO', 'BALEAR', 'ESTATAL', 'UNIÓN EUROPEA'];
  columnsDisplayed: string[] = grantorProjectColumns.map((col) => col.key);
  dataSource = new MatTableDataSource();
  columnsSchema: any = grantorProjectColumns;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService) {
    this.loadAllGrantorsProjects();
  }

  loadAllGrantorsProjects() {
    this.dataService
      .getAllGrantorProjects()
      .subscribe((grantorProjects: GrantorProjectsDTO[]) => {
        this.dataSource.data = grantorProjects;
        this.dataSource.paginator = this.paginator;
      });
  }
}
