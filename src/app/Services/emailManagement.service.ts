import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

const URL_API = 'https://emailvalidation.abstractapi.com/v1/?api_key=0b27a379af684fa9bd8c0a672c535d3d'
const URL_API_SEND = 'https://tramits.idi.es/public/assets/utils/enviaCorreoElectronicoIbrelleu.php'

export interface updateResponse {
  affected: number;
}

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root'
})

export class EmailManagementService {

  constructor(private http: HttpClient) {}

  validateThisEmail(emailAddress: string): Observable<any> {
    return this.http
      .get<any>(`${URL_API}&email=${emailAddress}` )
  }

  sendCustomerEmail(mailContent: any): Observable<any> {
    const islandList: string[] = ["Mallorca", "Menorca", "Eivissa", "Formentera"]
    const name: string = mailContent.firstName + " " + mailContent.lastName
    const email: string = mailContent.mainMail
    const phone: string = mailContent.mainPhone
    const address: string = mailContent.localizationAddress
    const zipCode: string = mailContent.zipCode
    const town: string = mailContent.town
    const municipality: string = mailContent.council
    const island: string = islandList[mailContent.island]
    const profile: string = mailContent.userProfile === 'grantor' ? 'CEDENT' : 'EMPRENEDOR';
    const subjectTxt: string = "Alta a IBrelleu"
    const projectName: string = "ibrelleu - Relleu de negocis"
    const messageData: string = address+"_"+zipCode+"_"+town+"_"+municipality+"_"+island+"_"+profile

    return this.http
      .get<any>(`${URL_API_SEND}?${email}/${name}/${phone}/${subjectTxt}/${projectName}/${messageData}`).pipe(
        map(response => {
          if (response.status === 'success') {
            console.log('Email sent successfully:', response.message);
          } else {
            console.error('Error sending email:', response.message);
          }
          return response;
        }),
        catchError(error => {
          console.error('HTTP error:', error);
          return throwError(() => new Error('Error in HTTP request'));
        })
      );
  }

  sendEmailNewUSer(mailContent: any): Observable<any> {
    console.log ("enviado a mail new contact: ", mailContent.value)
    const islandList: string[] = ["Mallorca", "Menorca", "Eivissa", "Formentera"]
    const name: string = mailContent.value.firstName + " " + mailContent.value.lastName
    const email: string = mailContent.value.mainMail
    const phone: string = mailContent.value.mainPhone
    const address: string = mailContent.value.localizationAddress
    const zipCode: string = mailContent.value.zipCode.zipCode
    const town: string = mailContent.value.zipCode.town
    const municipality: string = mailContent.value.zipCode.council
    const island: string = mailContent.value.zipCode.island
    const profile: string = mailContent.value.userProfile === 'grantor' ? 'CEDENT' : 'EMPRENEDOR';
    const subjectTxt: string = "Alta a IBrelleu"
    const projectName: string = "ibrelleu - Relleu de negocis"
    const messageData: string = address+"_"+zipCode+"_"+town+"_"+municipality+"_"+island+"_"+profile

    return this.http
      .get<any>(`${URL_API_SEND}?${email}/${name}/${phone}/${subjectTxt}/${projectName}/${messageData}`).pipe(
        map(response => {
          if (response.status === 'success') {
            console.log('Email sent successfully:', response.message);
          } else {
            console.error('Error sending email:', response.message);
          }
          return response;
        }),
        catchError(error => {
          console.error('HTTP error:', error);
          return throwError(() => new Error('Error in HTTP request'));
        })
      );
  }

  errorLog(error: HttpErrorResponse): void {
    console.error('An error occurred:', error.error.msg);
    console.error('Backend returned code:', error.status);
    console.error('Complete message was:', error.message);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

 private handleError(error: HttpErrorResponse) {
    let errorMessage = '##Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `##Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `##Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
