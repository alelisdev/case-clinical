import { Route } from '@angular/router';
import { AnalyticsComponent } from 'libs/web/modules/admin/dashboards/analytics/analytics.component';
import { AnalyticsResolver } from 'libs/web/modules/admin/dashboards/analytics/analytics.resolvers';

export const analyticsRoutes: Route[] = [
    {
        path     : '',
        component: AnalyticsComponent,
        resolve  : {
            data: AnalyticsResolver
        }
    }
];
