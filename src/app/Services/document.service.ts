import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'https://data.ibrelleu.es/public/index.php/api/documents';

  constructor(private http: HttpClient) { }

  uploadDocuments(foldername: string, id: number, formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`/api/documents/upload/${foldername}/${id}`, formData, {
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
    let errorMessage = '¡Error desconocido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Código: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
