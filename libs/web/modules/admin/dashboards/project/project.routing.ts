import { Route } from '@angular/router';
import { ProjectComponent } from 'libs/web/modules/admin/dashboards/project/project.component';
import { ProjectResolver } from 'libs/web/modules/admin/dashboards/project/project.resolvers';

export const projectRoutes: Route[] = [
    {
        path     : '',
        component: ProjectComponent,
        resolve  : {
            data: ProjectResolver
        }
    }
];
