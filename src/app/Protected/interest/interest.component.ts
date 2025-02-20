import { Component, ViewChild } from '@angular/core';
import { InterestColumnsBBDD, InterestDTO } from '../../Models/interest.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'adr-interest',
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss'
})
export class InterestComponent {
  columnsDisplayed: string[] = InterestColumnsBBDD.map((col) => col.key)
  dataSource = new MatTableDataSource()
  columnsSchema: any = InterestColumnsBBDD

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private dataService: DataService) {
    this.loadAllInterestData()
  }

  loadAllInterestData() {
    this.dataService.getAllInterests().subscribe((interests: InterestDTO[]) => {
      this.dataSource.data = interests;
      this.dataSource.paginator = this.paginator
    })
  }

}
