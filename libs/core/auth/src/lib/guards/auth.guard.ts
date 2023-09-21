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
import { ChatStore } from 'libs/web/chat/feature/src/lib/chat.store'
import { Observable, map } from 'rxjs'
import { AuthService } from '../auth.service'

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    isChatSyncing: boolean = false;
    constructor(private _authService: AuthService, private _router: Router, private _chatStore: ChatStore) {}

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
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree>  | Promise<boolean> | boolean {
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
    private _check(redirectURL: string): Observable<boolean | UrlTree>  {
        return this._authService.check().pipe(
            map((loggedIn) => {
                if (!loggedIn) {
                    return this._router.createUrlTree(['/sign-in'], {
                        queryParams: { redirectURL },
                    })
                }
                if(!this.isChatSyncing && localStorage.getItem('accessToken')) {
                    this.isChatSyncing = true
                    this._chatStore.me().subscribe()
                    this._chatStore.matrixLogin().subscribe()
                } else if(!localStorage.getItem('accessToken')) {
                    this._chatStore.stopClient()
                    this.isChatSyncing = false
                }
                return true
            })
        )
    }
}
