import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CubeDashboardService } from 'libs/web/modules/admin/dashboards/cube/cube-dashboard.service';

@Injectable({
    providedIn: 'root'
})
export class CubeDashboardResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _cubeDashboardService: CubeDashboardService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._cubeDashboardService.getData();
    }
}
