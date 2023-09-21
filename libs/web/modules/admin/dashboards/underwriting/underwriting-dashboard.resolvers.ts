import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UnderwritingDashboardService } from 'libs/web/modules/admin/dashboards/underwriting/underwriting-dashboard.service';

@Injectable({
    providedIn: 'root'
})
export class UnderwritingDashboardResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _underwritingDashboardService: UnderwritingDashboardService)
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
        return this._underwritingDashboardService.getData();
    }
}
