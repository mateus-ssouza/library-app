import { Injectable } from '@angular/core';
import { ServiceInterface } from './serviceInterface';
import { Copy } from '../models/Copy';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class CopyService implements ServiceInterface<Copy> {
  private apiUrl = `${environment.ApiUrl}/copies`;

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Copy[]> {
    return this.http.get<Copy[]>(this.apiUrl);
  }

  GetAllBooksWithCopies(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books-with-copies`);
  }

  GetAllBooksWithoutCopies(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books-without-copies`);
  }

  GetById(id: string): Observable<Copy> {
    return this.http.get<Copy>(`${this.apiUrl}/${id}`);
  }

  GetByBookId(id: string): Observable<Copy[]> {
    return this.http.get<Copy[]>(`${this.apiUrl}/book/${id}`);
  }

  Update(id: string, copy: Object): Observable<Copy>  {
    return this.http.put<Copy>(`${this.apiUrl}/${id}`, copy);
  }

  Add(item: Copy): Observable<any> {
    throw new Error('Method not implemented.');
  }

  AddCopy(copy: Object, idBook: string): Observable<Copy> {
    return this.http.post<Copy>(`${this.apiUrl}/book/${idBook}`, copy);
  }

  Delete(id: string): Observable<Copy> {
    return this.http.delete<Copy>(`${this.apiUrl}/${id}`)
  }
}

