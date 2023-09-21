/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOptions } from './i-http-options';
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private httpOptions: HttpOptions
  ) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('ADD-TOKEN-NAME-HERE');
    if (
      request.url.includes(this.httpOptions.apiURL)
      && token
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
    return next.handle(request);
  }
}
