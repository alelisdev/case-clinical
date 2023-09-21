/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMessage, ApiMessageType, ApiResponse } from '@schema-driven/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
    return;
  }

  displayToUser = true;
  doNotDisplayToUser = false;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * Use to handle errors during HTTP/Web API operations. The caller expects
   * an Observable response - this method will either return the response from
   * the server or a new [ApiResponse] as an Observable for the client to
   * handle.
   *
   * @param error The error from the HTTP response.
   */
  protected handleError(error: HttpErrorResponse): Observable<any> {
    const apiErrorResponse = new ApiResponse();
    apiErrorResponse.isSuccess = false;
    apiErrorResponse.message = 'Unexpected HTTP error.';
    apiErrorResponse.timestamp = new Date();

    if (error.status === 401) {
      this.router.navigateByUrl('/auth/login');
    }

    // Use the base error object to determine if the error type is a general or an all-purpose error.
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      apiErrorResponse.messages.push(
        new ApiMessage(
          `HTTP_ERROR`,
          `A client-side or network error occurred.`,
          ApiMessageType.Error
        )
      );
      return throwError(apiErrorResponse);
    } else {
      // The API returned an unsuccessful response (failure status code).
      if (error instanceof ApiResponse) {
        /**
         * A known error response format from the API/Server; rethrow this response.
         *
         * Throwing the error sends the Observable to the subscriber of the response.
         * The subscriber or consumer should handle the response and display of messages.
         */
        return throwError(error);
      } else {
        if (error?.error?.error_description) {
          apiErrorResponse.message = error.error.error_description
        }
        // An unhandled error/exception - may not want to display this information to an end-user.
        apiErrorResponse.messages.push(
          new ApiMessage(
            `HTTP_ERROR`,
            `${error.status}: ${error.statusText}. ${error.message}`,
            ApiMessageType.Error
          )
        );
        return throwError(apiErrorResponse);
      }
    }
  }
}
