import { Injectable } from '@angular/core'
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router'
import { UserRole } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WebAuthStore } from '../web-auth-data-access.store'

@Injectable()
export class IsAdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly router: Router,
    private readonly store: WebAuthStore,
    private readonly toast: WebUiToastService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isAdmin()
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.isAdmin()
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.isAdmin()
  }

  private isAdmin(): Observable<boolean | UrlTree> {
    return this.store.user$.pipe(
      map((user) => user.userRoles.some((r: UserRole) => r?.role?.name == 'Admin')),
      map((isAdmin) => {
        if (!isAdmin) {
          this.toast.error(`You need to have Admin permissions.`)
          return this.router.createUrlTree(['/dashboard'])
        }
        return true
      }),
    )
  }
}
