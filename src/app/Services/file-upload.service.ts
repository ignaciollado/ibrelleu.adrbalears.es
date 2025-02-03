import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

export interface uploadedFiles {
  status: string;
  files: string[];
}

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  //private baseUrl = 'https://docs.ibrelleu.es/upload';
  //private baseUrl = 'https://docs.ibrelleu.es/public/index.php/upload';
  private apiUrl = '../../assets/phpAPI/FileUploadController.php';
  private listFilesUrl = '../../assets/phpAPI/listFiles.php';
  private deleteUrl = '../../assets/phpAPI/deleteFile.php'; 

  private cancelUpload$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  upload(files: File[], id: string, foldername: string): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files[]', file, file.name);
    });

    formData.append('id', id);
    formData.append('foldername', foldername);

    formData.append('id', id);
    formData.append('foldername', foldername);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    );
  }

  cancelUpload(): void {
    this.cancelUpload$.next();
  }

  listFiles(id: string, foldername: string): Observable<uploadedFiles[]> {
    let params = new HttpParams().set('id', id).set('foldername', foldername);
    return this.http.get<uploadedFiles[]>(this.listFilesUrl, { params })
  }

  deleteFile(filename: string, id: string, foldername: string) {
    const params = { filename, id, foldername };
    return this.http.delete(this.deleteUrl, { params }).pipe(
      catchError(this.handleError)
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