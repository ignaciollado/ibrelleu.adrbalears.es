import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactDTO } from '../Models/contact.dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain', /* la única forma de evitar errores de CORS ha sido añadiendo esta cabecera */
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '../../assets/phpAPI/';
  private apiData = 'https://data.ibrelleu.es/public/index.php';
  constructor(private http: HttpClient) { }

  /*   getContacts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactList.php`).pipe(
      catchError(this.handleError));
  } */

  getContacts(): Observable<any> {
      return this.http.get(`${this.apiData}/api/contacts/`, httpOptions).pipe(
        catchError(this.handleError));
    }

/*   getContact(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactGetOne.php?id=${id}`).pipe(
      catchError(this.handleError));
  } */

  getContactById(id: number): Observable<ContactDTO> {
        return this.http.get<ContactDTO>(`${this.apiData}/api/contact-by-id/${id}`).pipe(
          catchError(this.handleError));
      }

  /*   getContactByDNI(dni: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactGetOneByDNI.php?dni=${dni}`).pipe(
      catchError(this.handleError));
  } */
  
  getContactByDNI(dni: string): Observable<any> {
    return this.http.get(`${this.apiData}/api/contact-by-dni/${dni}`).pipe(
      catchError(this.handleError));
  }

  /*   createContact(contact: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contactInsert.php`, contact).pipe(
      catchError(this.handleError));
  } */

  createContactSignUp(contact: any): Observable<any> {
    return this.http
    .post<any>(`${this.apiData}/api/create-contact-from-sign-up/`, contact, httpOptions)
    .pipe(catchError(this.handleError));
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
      if (error.status === 404) {
        errorMessage = 'Not found'
      }
    }
    return throwError(errorMessage);
  }
}
