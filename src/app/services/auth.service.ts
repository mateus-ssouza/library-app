import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.ApiUrl}/auth`;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  Login(login: Object): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, login, { responseType: 'json' })
      .pipe(
        map((data) => this.setTokenLocalStorage(data)),
        catchError((err) => {
          this.removeTokenLocalStorage();
          throw 'Falha ao efetuar o login';
        })
      );
  }

  Register(user: Object): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, user, { responseType: 'json' })
  }

  public Logout(): boolean {
    try {
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      console.error('Erro ao remover o token do localStorage:', error);
      return false;
    }
  }

  public getToken(): string | null {
    let token = null;

    if (typeof window !== 'undefined') {
      token = localStorage.getItem(environment.token);
    }
    return token;
  }

  public getUserTypeFromToken(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.userType;
    }

    return null;
  }

  private setTokenLocalStorage(response: any): void {
    const { user, token, _ } = response;
    localStorage.setItem(environment.token, token);
  }

  private removeTokenLocalStorage(): void {
    localStorage.removeItem(environment.token);
  }
}
