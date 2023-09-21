import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import { AuthService } from '../auth.service';
import { AuthenticationStatus } from '@case-clinical/web/auth/data-access';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  /**
   * Constructor
   */
  constructor(private _authService: AuthService, private _router: Router) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url
    return this._check(redirectUrl)
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url
    return this._check(redirectUrl)
  }

  /**
   * Can load
   *
   * @param route
   * @param segments
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    return this._check('/')
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check the authenticated status
   *
   * @param redirectURL
   * @private
   */
  private _check(redirectURL: string): Observable<boolean | any> {
    return this._authService.check().pipe(
      map((status) => {
        console.log(status, String(status), AuthenticationStatus.AUTHENTICATED)
        if (status === AuthenticationStatus.AUTHENTICATED) {
          console.log('Authenticated')
          return this._router.createUrlTree(['/dashboards/project'])
        } else if(status === AuthenticationStatus.GUEST) {
          console.log('Guest')
          return this._router.createUrlTree(['/sign-in'])
        } else if(status === AuthenticationStatus.AUTHENTICATING) {
          return true;
        }
      })
    )
  }
}
