import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '../../assets/phpAPI/';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactList.php`).pipe(
      catchError(this.handleError));
  }

  getContact(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactGetOne.php?id=${id}`).pipe(
      catchError(this.handleError));
  }

  getContactByDNI(dni: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactGetOneByDNI.php?dni=${dni}`).pipe(
      catchError(this.handleError));
  }


  createContact(contact: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contactInsert.php`, contact).pipe(
      catchError(this.handleError));
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contactDelete.php?id=${id}`).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
