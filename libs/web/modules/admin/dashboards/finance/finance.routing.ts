import { Route } from '@angular/router';
import { FinanceComponent } from 'libs/web/modules/admin/dashboards/finance/finance.component';
import { FinanceResolver } from 'libs/web/modules/admin/dashboards/finance/finance.resolvers';

export const financeRoutes: Route[] = [
    {
        path     : '',
        component: FinanceComponent,
        resolve  : {
            data: FinanceResolver
        }
    }
];
