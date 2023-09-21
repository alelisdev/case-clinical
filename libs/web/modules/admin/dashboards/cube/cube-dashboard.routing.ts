import { Route } from '@angular/router';
import { CubeDashboardComponent } from './cube-dashboard.component';
import { CubeDashboardResolver } from './cube-dashboard.resolvers';

export const CubeDashboardRoutes: Route[] = [
    {
        path     : '',
        component: CubeDashboardComponent,
        resolve  : {
            data: CubeDashboardResolver
        }
    }
];
