import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CpibDTO } from '../Models/cpib.dto';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

export class CpibService {
  private urlAPiMock: string;

  constructor( private http: HttpClient, private sharedService: SharedService ) {
    this.urlAPiMock = '../Models/mocks/'
  }
getCPList(): Observable<CpibDTO[]> {
  return this.http
    .get<CpibDTO[]>(`${this.urlAPiMock}cp-ib.json`)
    .pipe(catchError(this.sharedService.handleError))
}
}