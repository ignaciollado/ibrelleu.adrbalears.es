import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  private apiUrl = 'https://data.ibrelleu.es/public/index.php/api/documents';

  constructor(private http: HttpClient) { }

  uploadDocuments(foldername: string, id: number, formData: FormData): Observable<HttpEvent<any>> {
      const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*,*',
      'Accept': 'application/json'
      })
    return this.http.post<any>(`${this.apiUrl}/${foldername}/${id}/upload`, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.handleError));
  }

  getDocuments(foldername: string, id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${foldername}/${id}`)
      .pipe(catchError(this.handleError));
  }

  deleteDocument(foldername: string, id: number, docId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${foldername}/${id}/${docId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}