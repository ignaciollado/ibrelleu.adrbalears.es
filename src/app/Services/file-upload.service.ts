import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadUrl = 'https://docs.ibrelleu.es/public/index.php';

  constructor(private http: HttpClient) { }

  upload(files: File[]): Observable<number> {
    const formData = new FormData()
    files.forEach(file => formData.append('files', file, file.name));
    return this.http.post(this.uploadUrl+'/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: any): number {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return Math.round(100 * event.loaded / event.total);
      case HttpEventType.Response:
        return 100;
      default:
        return 0;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Upload failed', error);
    return throwError('Upload failed. Please try again later.');
  }
}