import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const myToken = this.authService.getToken();

    if (myToken !== null) {
      const authRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });

      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
