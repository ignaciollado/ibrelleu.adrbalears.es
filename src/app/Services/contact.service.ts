import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '../../assets/phpAPI/'; // Cambia esto a tu dominio

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactList.php`);
  }

  getContact(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactGetOne.php?id=${id}`);
  }

  createContact(contact: any): Observable<any> {
    console.log (contact)
    return this.http.post(`${this.apiUrl}/contactInsert.php`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contactDelete.php?id=${id}`);
  }
}
