import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

const baseUrl = 'http://localhost:3000/api/v1/contacts';

let headers = new HttpHeaders({});

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(baseUrl);
  }

  get(id: any): Observable<Contact> {
    return this.http.get<Contact>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByNameOrSurname(q: any): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${baseUrl}/search/${q}`);
  }

  exportToPDF(): Observable<any> {
    return this.http.get(`${baseUrl}/export/all`, {
      headers,
      responseType: 'blob',
    });
  }
}
