import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  sendCustomerEmail(data: any): Observable<any> {

    let mailcontent: string = ""
    const name: string = data.value.firstName + " " + data.value.lastName
    const email: string = data.value.mainMail
    const phone: string = data.value.mainPhone
    const address: string = data.value.localizationAddress
    const zipCode: string = data.value.zipCode
    const localizationCity: string = data.value.localizationCity
    const councilCity: string = data.value.councilCity
    
    const subjectTxt: string = "Sol·licitud alta a IBrelleu"
    const projectName: string = "ibrelleu - Relleu de negocis"

    console.log ("titulo: ", address, data.value.id,)

    mailcontent = subjectTxt +"_"+  projectName +"_"+ name + "_" + address + "_" 

    return this.http
      .get<any>(`${URL_API_SEND}?${email}/${name}/${phone}/${subjectTxt}/${mailcontent}/${projectName}`)
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

}
