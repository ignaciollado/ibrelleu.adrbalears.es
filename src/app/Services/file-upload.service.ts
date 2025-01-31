import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  //private baseUrl = 'https://docs.ibrelleu.es/upload';
  //private baseUrl = 'https://docs.ibrelleu.es/public/index.php/upload';
  private apiUrl = '../../assets/phpAPI/FileUploadController.php';
  private listFilesUrl = '../../assets/phpAPI/Listfiles.php';

  private cancelUpload$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  upload(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files[]', file, file.name);
    });

    const req = new HttpRequest('POST', this.apiUrl, formData, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, files)),
      takeUntil(this.cancelUpload$)
    );
  }

  cancelUpload(): void {
    this.cancelUpload$.next();
  }

  listFiles(): Observable<any> {
    return this.http.get(this.listFilesUrl).pipe(
      map(response => response)
    );
  }

  private getEventMessage(event: HttpEvent<any>, files: File[]): any {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / (event.total ?? 1));
        const fileName = files.find(file => file.size === event.total)?.name || 'unknown';
        return { status: 'progress', fileName, percentDone };

      case HttpEventType.Response:
        return event.body;

      default:
        return `Unhandled event: ${event.type}`;
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