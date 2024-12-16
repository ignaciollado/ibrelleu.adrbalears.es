import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SuccessStoriesDTO } from '../Models/success-stories.dto';
import { SharedService } from './shared.service';
import { AccountDTO } from '../Models/account.dto';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private urlAPIMock: string

  constructor( private http: HttpClient, private sharedService: SharedService) { 
    this.urlAPIMock = '../../assets/mocks/'
  }

  getSuccessStories(): Observable<SuccessStoriesDTO[]> {
    return this.http
      .get<SuccessStoriesDTO[]>(`${this.urlAPIMock}success-stories.json`)
      .pipe(catchError(this.sharedService.handleError))
  }

  getAllAccounts(): Observable<AccountDTO[]> {
    return this.http
      .get<AccountDTO[]>(`${this.urlAPIMock}accounts.json`)
      .pipe(catchError(this.sharedService.handleError))
  }


}
