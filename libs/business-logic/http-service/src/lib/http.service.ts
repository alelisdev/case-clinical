/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase, ServiceContext } from '@schema-driven/foundation';
import { LoggingService, Severity } from '@schema-driven/logging';
import { Observable } from 'rxjs';
import { HttpRequestMethod } from './http-request-methods.enum';
import { HttpRequestOptions } from './http-request-options';
import { HttpOptions } from './i-http-options';

@Injectable({ providedIn: 'root' })
export class HttpService extends ServiceBase {
  private csrfToken = '';

  constructor(
    private httpClient: HttpClient,
    loggingService: LoggingService,
    serviceContext: ServiceContext,
    private httpOptions: HttpOptions
  ) {
    super('HttpService', loggingService, serviceContext);
  }

  /**
   * Use to create [options] for the API request.
   * @param method Use to indicate the HttpRequest verb to target.
   * @param headers Use to provide any [HttpHeaders] with the request.
   * @param url Use to indicate the target URL for the API request.
   * @param body Use to provide a JSON object with the payload for the request.
   * @param withCredentials Use to indicate if request will include credentials (cookies), default value is [false].
   */
  createOptions(
    method: HttpRequestMethod,
    headers: HttpHeaders | null,
    url: string,
    body: any,
    params: any,
    withCredentials = false
  ): HttpRequestOptions {
    const options = new HttpRequestOptions();
    options.requestMethod = method;
    options.headers = headers || new HttpHeaders();
    options.requestUrl = url;
    options.body = body;
    options.params = params;
    options.withCredentials = withCredentials;
    return options;
  }

  /**
   * Use to create a new [HttpHeaders] object for the HTTP/API request.
   * @param includeCsrf Include CSRF header
   * @returns
   */
  createHeader(includeCsrf = false): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');

    if (includeCsrf) {
      headers = headers.set('x-csrf-token', this.csrfToken);
    }
    return headers;
  }

  /**
   * Use to execute an HTTP request using the specified options in the [HttpRequestOptions].
   * @param requestOptions
   */
  execute<T>(requestOptions: HttpRequestOptions): any {
    return this.httpClient.request<T>(requestOptions.requestMethod.toString(), requestOptions.requestUrl, {
      body: requestOptions.body,
      headers: requestOptions.headers,
      reportProgress: requestOptions.reportProgress,
      observe: 'response',
      params: requestOptions.params,
      responseType: requestOptions.responseType,
      withCredentials: requestOptions.withCredentials,
    });
  }

  executeObserveBody<T>(requestOptions: HttpRequestOptions): Observable<T> {
    return this.httpClient.request<T>(requestOptions.requestMethod.toString(), requestOptions.requestUrl, {
      body: requestOptions.body,
      headers: requestOptions.headers,
      reportProgress: requestOptions.reportProgress,
      observe: 'body',
      params: requestOptions.params,
      responseType: requestOptions.responseType,
      withCredentials: requestOptions.withCredentials,
    });
  }

  /**
   * Get CSRF token
   * @returns Observable
   */
  getCsrfToken() {
    const requestUrl = this.httpOptions.csrf;
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to get CSRF token.`);
    const options = this.createOptions(HttpRequestMethod.get, null, requestUrl, null, null, false);
    return this.execute(options);
  }

  /**
   * Handle Request to get CSRF Token
   * @param response
   */
  private handleCsrfResponse(response: any): void {
    const requestName = `CSRF token request`;
    if (response) {
      const { body } = response;
      this.csrfToken = body?.data?.token;
      this.loggingService.log(
        this.serviceName,
        Severity.Information,
        `Preparing to handle successful response for ${requestName}.`
      );
    } else {
      this.loggingService.log(
        this.serviceName,
        Severity.Warning,
        `Received unexpected null/undefined response for ${requestName}.`
      );
    }
  }
}
