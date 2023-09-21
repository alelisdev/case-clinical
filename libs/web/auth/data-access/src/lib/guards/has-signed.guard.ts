import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WebAuthStore } from '../web-auth-data-access.store'

@Injectable()
export class HasSignedGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly store: WebAuthStore, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.hasSignedDocument(state.url)
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.hasSignedDocument()
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.hasSignedDocument()
  }

  private hasSignedDocument(url?: string): Observable<boolean | UrlTree> {
    return this.store.hasSigned$.pipe(
      map((hasSigned: boolean) => {
        console.log('Has Signed:', hasSigned)
        if (!hasSigned) {

          return this.router.createUrlTree(['/register'], {
            queryParams: { url },
          })
        }
        return true
      }),
    )
  }
}