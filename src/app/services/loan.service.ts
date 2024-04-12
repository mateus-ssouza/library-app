import { Injectable } from '@angular/core';
import { Loan } from '../models/Loan';
import { ServiceInterface } from './serviceInterface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoanService implements ServiceInterface<Loan> {
  private apiUrl = `${environment.ApiUrl}/loans`;

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  GetMyLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/myloans`);
  }

  GetByIdMyLoans(id: string): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/myloans/${id}`);
  }

  GetById(id: string): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  Update(id: string, loan: Object): Observable<Loan>  {
    return this.http.put<Loan>(`${this.apiUrl}/${id}`, loan);
  }

  Add(loan: Object): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}`, loan);
  }

  Delete(id: string): Observable<Loan> {
    return this.http.delete<Loan>(`${this.apiUrl}/${id}`);
  }

  Validate(id: string): Observable<Loan>  {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/validate`, {});
  }

  Finalize(id: string): Observable<Loan>  {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/finalize`, {});
  }
}
