import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain', /* la única forma de evitar errores de CORS ha sido añadiendo esta cabecera */
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = '../../assets/phpAPI/';
  private apiData = 'https://data.ibrelleu.es/public/index.php';

  constructor(private http: HttpClient) { }

    getAccounts(): Observable<any> {
      return this.http.get(`${this.apiData}/api/accounts/`, httpOptions).pipe(
        catchError(this.handleError));
    }

  getAccountByCIF(cif: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accountGetOneByCIF.php?cif=${cif}`).pipe(
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
