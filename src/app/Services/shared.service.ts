import { HttpErrorResponse,HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ZipCodesIBDTO } from '../Models/zip-codes-ib.dto';
import { catchError } from 'rxjs/operators';

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private urlAPiMock: string
  constructor(private http: HttpClient,) {
    this.urlAPiMock = '../Models/mocks/'
  }

  async managementToast( element: string, validRequest: boolean, error?: HttpErrorResponse ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show requestOk';
        toastMsg.textContent = 'Data submitted successfully.';
        await this.wait(4500);
        toastMsg.className = toastMsg.className.replace('show', '');
      } else {
        toastMsg.className = 'show requestKo';
        if (error?.status) {
          toastMsg.textContent =
            'Error on data submitted. ' +
            error?.error.messages.error +
            '. Status code: ' +
            error?.status;
        } else {
          toastMsg.textContent =
            error?.error.messages.error +'. Error on data submitted. ' +
            'Status code: ' +
            error?.status;
        }

        await this.wait(9000);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
  }

  getAllYears(): Observable<ZipCodesIBDTO[]> {
    return this.http
      .get<ZipCodesIBDTO[]>(`${this.urlAPiMock}cp-ib.json`)
  }

  errorLog(error: HttpErrorResponse): void {
    console.log ("el error: ", error)
    console.error('status:', error.status)
    console.error('messages:', error.error.messages.error)
    console.error('message:', error.message)
    console.error('statusText:', error.statusText)
    console.error('name:', error.name)
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
