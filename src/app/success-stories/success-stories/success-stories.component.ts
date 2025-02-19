import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  SuccessStoriesColumnsBBDD,
  SuccessStoriesDTO,
} from '../../Models/success-stories.dto';
import { DataService } from '../../Services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from '../../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'adr-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrl: './success-stories.component.scss',
})
export class SuccessStoriesComponent {
  successStories: SuccessStoriesDTO[];
  columnsDisplayed: string[] = SuccessStoriesColumnsBBDD.map((col) => col.key);
  columnsSchema: any = SuccessStoriesColumnsBBDD
  dataSource = new MatTableDataSource<SuccessStoriesDTO>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private sharedService: SharedService,
    private dataService: DataService
  ) {
    this.loadSuccessStories();
  }

  private loadSuccessStories(): void {
    let errorResponse: any;
    this.dataService.getSuccessStories().subscribe(
      (successStories: SuccessStoriesDTO[]) => {
        this.successStories = successStories;
        console.log('casos de éxito ', this.successStories);
        this.dataSource = new MatTableDataSource<SuccessStoriesDTO>(
          this.successStories
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
