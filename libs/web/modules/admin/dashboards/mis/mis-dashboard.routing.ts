import { Route } from '@angular/router';
import { MisDashboardComponent } from 'libs/web/modules/admin/dashboards/mis/mis-dashboard.component';

export const misDashboardRoutes: Route[] = [
    {
        path     : '',
        component: MisDashboardComponent,
    }
];
