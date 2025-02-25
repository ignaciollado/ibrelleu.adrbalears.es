import { Component, ViewChild } from '@angular/core';
import { advertisementColumnsBBDD, AdvertisementDTO } from '../../Models/advertisement.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdvertisementService } from '../../Services/advertisement.service';

@Component({
  selector: 'adr-advertisements-relleu',
  templateUrl: './advertisements-relleu.component.html',
  styleUrl: './advertisements-relleu.component.scss'
})
export class AdvertisementsRelleuComponent {

  columnsDisplayed: string[] = advertisementColumnsBBDD.map((col) => col.key)
  columnsSchema: any = advertisementColumnsBBDD;

  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private advertisementsService: AdvertisementService) {

    this.loadAllAdvertisements();

  }

  loadAllAdvertisements() {
    this.advertisementsService.getAllAdvertisements().subscribe((advertisements: AdvertisementDTO[]) => {
      advertisements = advertisements.filter(ads => ads.projecttype === "Relleu")

      this.dataSource.data = advertisements
      this.dataSource.paginator = this.paginator
    })
  }
}
