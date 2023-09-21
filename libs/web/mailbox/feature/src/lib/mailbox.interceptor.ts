import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { MailboxService } from './mailbox.service'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { Router } from '@angular/router'

@Injectable()
export class MailboxInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private _mailboxService: MailboxService, private readonly toast: WebUiToastService, private readonly router: Router) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone()

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        // if (this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken)) {

            if(!this._mailboxService.token) {
                this.router.navigate(['apps/mailbox']);
                return;
            }
            newReq = req.clone({
                headers: req.headers.set('Authorization', this._mailboxService.token)
            })
        // }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {
                // Catch "401 Unauthorized" responses
                if (error instanceof HttpErrorResponse && error.status === 500) {
                    const message = error?.error?.message ? error?.error?.message : 'Server Error!';
                    this.toast.error(message);
                }
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    console.log('error');
                    
                    // Sign out
                    // this._authService.signOut()

                    // Reload the app
                    //location.reload()
                    const message = error?.error?.message ? error?.error?.message : 'Server Error!';
                    this.toast.error(message);
                    this._mailboxService.removeAccessTokenFromLocal();
                    window.location.reload();
                    this.router.navigate(['apps/mailbox']);
                    // this.router.navigate(["dashboards","project"])
                }

                return throwError(error)
            }),
        )
    }
}
