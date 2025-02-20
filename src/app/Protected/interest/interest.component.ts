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
      interests.forEach(interest => {
        this.dataService.getAllInterestsStatus().subscribe((statusList: any[]) => {
          interest.estatInteres = statusList.find(status => status.value === interest.estatInteres).label
        })
      })
      this.dataSource.data = interests;
      this.dataSource.paginator = this.paginator
    })
  }

}
