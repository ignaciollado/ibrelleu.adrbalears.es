import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'https://docs.ibrelleu.es/public/index.html/upload';
  private cancelUpload$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  upload(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach(file => formData.append('files[]', file, file.name));

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    const req = new HttpRequest('POST', this.baseUrl, formData, {
      headers: headers,
      reportProgress: true
    });

    return this.http.request(req).pipe(
      takeUntil(this.cancelUpload$),
      map(event => this.getEventMessage(event, files))
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
}