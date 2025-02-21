import { Component, ViewChild } from '@angular/core';
import { advertisementColumnsBBDD, AdvertisementDTO } from '../../Models/advertisement.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdvertisementService } from '../../Services/advertisement.service';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'adr-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.scss'
})
export class AdvertisementsComponent {

  columnsDisplayed: string[] = advertisementColumnsBBDD.map((col) => col.key)
  columnsSchema: any = advertisementColumnsBBDD;

  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private advertisementsService: AdvertisementService, private dataService: DataService) {

    this.loadAllAdvertisements();

  }

  loadAllAdvertisements() {
    this.advertisementsService.getAllAdvertisements().subscribe((advertisements: AdvertisementDTO[]) => {
      this.dataSource.data = advertisements
      this.dataSource.paginator = this.paginator
    })
  }
}
