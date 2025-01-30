import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
//private baseUrl = 'https://docs.ibrelleu.es/upload';
private baseUrl = 'https://docs.ibrelleu.es/public/index.php/upload';
private urlAPIMock = '../../assets/apiPHP';
  private cancelUpload$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  upload(files: File[]): Observable<any> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }

    return this.http.post(`${this.urlAPIMock}/FileUploadController.php`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    );
  }

  cancelUpload(): void {
    this.cancelUpload$.next();
  }

  private getEventMessage(event: HttpEvent<any>, files: File[]): any {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return { progress: Math.round(100 * event.loaded / event.total!), files: files.map(file => ({ name: file.name, status: 'Uploading' })) };
      case HttpEventType.Response:
        return { progress: 100, files: files.map(file => ({ name: file.name, status: 'Uploaded' })) };
      default:
        return { progress: 0, files: files.map(file => ({ name: file.name, status: 'Pending' })) };
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}