import { Route } from '@angular/router';
import { UnderwritingDashboardComponent } from 'libs/web/modules/admin/dashboards/underwriting/underwriting-dashboard.component';
import { UnderwritingDashboardResolver } from 'libs/web/modules/admin/dashboards/underwriting/underwriting-dashboard.resolvers';

export const underwritingDashboardRoutes: Route[] = [
    {
        path     : '',
        component: UnderwritingDashboardComponent,
        resolve  : {
            data: UnderwritingDashboardResolver
        }
    }
];
