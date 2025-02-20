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
import { GrantorProjectsDTO } from '../Models/grantorProject.dto';
import { IBRelleuProjectsDTO } from '../Models/ibrelleuproject.dto';
import { InterestDTO } from '../Models/interest.dto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private urlAPIMock: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.urlAPIMock = '../../assets/mocks/';
  }

  // Ordeno en base a la ordenación alfabética de los mocks
  getAllAccounts(): Observable<AccountDTO[]> {
    return this.http
      .get<AccountDTO[]>(`${this.urlAPIMock}accounts.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllActivities(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}activity.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllCessionReasons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlAPIMock}cessionReason.json`).pipe(catchError(this.sharedService.handleError))
  }

  getAllContacts(): Observable<ContactDTO[]> {
    return this.http
      .get<ContactDTO[]>(`${this.urlAPIMock}contacts.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllContactStates(): Observable<ContactStatesDTO[]> {
    return this.http
      .get<ContactStatesDTO[]>(`${this.urlAPIMock}contactStates.json`)
      .pipe(catchError(this.sharedService.handleError));
  }


  getAllGrantorProjects(): Observable<GrantorProjectsDTO[]> {
    return this.http
      .get<GrantorProjectsDTO[]>(`${this.urlAPIMock}grantor-projects.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllIbRelleuProjects(): Observable<IBRelleuProjectsDTO[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}ibrelleuProjects.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllInterests(): Observable<InterestDTO[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}interests.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllInterestsStatus(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}interestsStatus.json`)
      .pipe(catchError(this.sharedService.handleError));
  }


  getAllKnowWays(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}knowWays.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllLegalForms(): Observable<LegalFormDTO[]> {
    return this.http
      .get<LegalFormDTO[]>(`${this.urlAPIMock}legalForm.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllLevelsOfEducation(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}levelOfEducation.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllPropertyStatus(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}propertyStatus.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllSectors(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.urlAPIMock}sectors.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getSuccessStories(): Observable<SuccessStoriesDTO[]> {
    return this.http
      .get<SuccessStoriesDTO[]>(`${this.urlAPIMock}success-stories.json`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllTransferPriceInterval(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlAPIMock}transferPriceInterval.json`).pipe(catchError(this.sharedService.handleError));
  }

  getAllZipCodes(): Observable<ZipCodesIBDTO[]> {
    return this.http
      .get<ZipCodesIBDTO[]>(`${this.urlAPIMock}zipCodesIB.json`)
      .pipe(catchError(this.sharedService.handleError));
  }
}