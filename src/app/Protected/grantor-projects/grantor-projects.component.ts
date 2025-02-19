import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  grantorProjectColumnsBBDD,
  GrantorProjectsDTO,
} from '../../Models/grantorProject.dto';

@Component({
  selector: 'adr-grantor-projects',
  templateUrl: './grantor-projects.component.html',
  styleUrl: './grantor-projects.component.scss',
})
export class GrantorProjectsComponent {
  ambitos: string[] = ['AUTONÓMICO', 'BALEAR', 'ESTATAL', 'UNIÓN EUROPEA'];
  columnsDisplayed: string[] = grantorProjectColumnsBBDD.map((col) => col.key);
  dataSource = new MatTableDataSource();
  columnsSchema: any = grantorProjectColumnsBBDD;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService) {
    this.loadAllGrantorsProjects();
  }

  loadAllGrantorsProjects() {
    this.dataService
      .getAllGrantorProjects()
      .subscribe((grantorProjects: GrantorProjectsDTO[]) => {
        grantorProjects.forEach(grantorProject => {
          if (grantorProject.intervalPreuCessio.length == 9) {
            this.dataService.getAllTransferPriceInterval().subscribe((intervalPrices) => {
              grantorProject.intervalPreuCessio = intervalPrices.find(intervalPrice => intervalPrice.value === grantorProject.intervalPreuCessio).label
            })
          }

          this.dataService.getAllCessionReasons().subscribe((cessionReasons) => {
            grantorProject.motiuCessio = cessionReasons.find(cessionReason => cessionReason.value === grantorProject.motiuCessio).label
          })
          this.dataSource.data = grantorProjects;
          this.dataSource.paginator = this.paginator;
        })
      });
  }
}

