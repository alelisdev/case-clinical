import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { environment } from '@case-clinical/web/core/feature'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { of, Subject, takeUntil, tap } from 'rxjs'
import { ChatStore } from './chat.store'

export class ChatInterceptorService implements HttpInterceptor {
  private readonly MATRIX_CHAT_URL = environment.matrix_chat_url
  private readonly MATRIX_URL = environment.matrix_url
  // private readonly MATRIX_CHAT_URL="https://chat-service-uat.caseclinical.com"
  // private readonly MATRIX_URL="https://matrix-uat.caseclinical.com"

  constructor(private store: ChatStore, private http: HttpClient, private readonly toast: WebUiToastService,) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('interceptor')

    let authReq = req.clone()
    const chatAccessToken = localStorage.getItem('chatAccessToken')
    console.log(chatAccessToken)
    if (chatAccessToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${chatAccessToken}`),
      })
    }

    return next.handle(authReq).pipe(
      tap({
        next: () => {},
        error: (err) => {
          console.log(123, err)
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.store.handle401(authReq, next)
            } else if (
              err.status == 403 &&
              err.error.errcode == 'M_FORBIDDEN' &&
              err.error.error == "refresh token isn't valid anymore"
            ) {
              console.log('403 occured', err)
              // navigate user
              this.store.matrixLogin()
            } else {
              // navigate user
              this.toast.error(err.error)
            }
            // next.handle(authReq);
          }
        },
      }),
    )
  }


}
