import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { catchError, Observable } from 'rxjs';
import { AdvertisementDTO } from '../Models/advertisement.dto';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private urlAPIMock: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.urlAPIMock = '../../assets/mocks/';
  }

  getAllAdvertisements(): Observable<AdvertisementDTO[]> {
    return this.http.get<AdvertisementDTO[]>(`${this.urlAPIMock}advertisements.json`).pipe(catchError(this.sharedService.handleError))
  }
}
