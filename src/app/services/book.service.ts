import { Injectable } from '@angular/core';
import { ServiceInterface } from './serviceInterface';
import { Book } from '../models/Book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookService implements ServiceInterface<Book> {
  private apiUrl = `${environment.ApiUrl}/books`;

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  GetById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  Update(id: string, book: Object): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  Add(book: Object): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}`, book);
  }

  Delete(id: string): Observable<Book> {
    return this.http.delete<Book>(`${this.apiUrl}/${id}`);
  }
}
