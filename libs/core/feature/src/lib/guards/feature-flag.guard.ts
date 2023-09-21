import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { WebAuthStore } from "@case-clinical/web/auth/data-access";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class FeatureFlagGuard implements CanActivate {
  constructor(private userQuery: WebAuthStore, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable <boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasPermissionToAccess(route.params.flags).pipe(map((can) => {
      if(can) {
        return can
      } else {
        this.router.navigate(['./dashboards/project'])
        return can
      }
    }))
  }

  hasPermissionToAccess(flags: string | string[]) {
    return this.userQuery.hasFlags(flags).pipe(map(result => result))
  }
}