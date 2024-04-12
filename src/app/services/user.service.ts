import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements ServiceInterface<User> {
  private apiUrl = `${environment.ApiUrl}/users`;

  constructor(private http: HttpClient) {}

  GetAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  GetById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  GetProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  Update(id: string, user: Object): Observable<User>  {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  Add(item: User): Observable<any> {
    throw new Error('Method not implemented.');
  }

  Delete(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`)
  }
}
