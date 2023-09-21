import { Injectable } from '@angular/core'
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
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { Observable, of, switchMap } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    constructor(private _authService: WebAuthStore, private _router: Router) {}

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
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this._check()
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
        return this._check()
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this._check()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @private
     */
    private _check(): Observable<boolean> {
        // Check the authentication status
        return of(true)
    }
}
