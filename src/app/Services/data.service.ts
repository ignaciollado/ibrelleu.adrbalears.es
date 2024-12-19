import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SuccessStoriesDTO } from '../Models/success-stories.dto';
import { SharedService } from './shared.service';
import { AccountDTO } from '../Models/account.dto';
import { ContactDTO } from '../Models/contact.dto';
import { LegalFormDTO } from '../Models/legal-form.dto';
import { ContactStatesDTO } from '../Models/contact-states.dto';
import { ZipCodesIBDTO } from '../Models/zip-codes-ib.dto';

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

  getAllContacts(): Observable<ContactDTO[]> {
    return this.http
      .get<ContactDTO[]>(`${this.urlAPIMock}contacts.json`)
      .pipe(catchError(this.sharedService.handleError))
  }

  getAllLegalForms(): Observable<LegalFormDTO[]> {
    return this.http
      .get<LegalFormDTO[]>(`${this.urlAPIMock}legalForm.json`)
      .pipe(catchError(this.sharedService.handleError))
  }
  getAllContactStates(): Observable<ContactStatesDTO[]> {
    return this.http
      .get<ContactStatesDTO[]>(`${this.urlAPIMock}contactStates.json`)
      .pipe(catchError(this.sharedService.handleError))
  }
  getAllZipCodes(): Observable<ZipCodesIBDTO[]> {
    return this.http
      .get<ZipCodesIBDTO[]>(`${this.urlAPIMock}zipCodesIB.json`)
      .pipe(catchError(this.sharedService.handleError))
  }
  getAllEmployementsStatus(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}employmentStatus.json`)
      .pipe(catchError(this.sharedService.handleError))
  }
  getAllLevelsOfEducation(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}levelOfEducation.json`)
      .pipe(catchError(this.sharedService.handleError))
  }
  getAllWorkingModes(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}workingMode.json`)
      .pipe(catchError(this.sharedService.handleError))
  }
}
