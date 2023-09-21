
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAccountStatusFeatureComponent } from './web-account-status-feature.component'
import { Ng7DynamicBreadcrumbModule } from '@case-clinical/web/ui/breadcrumbs'

@NgModule({
  imports: [
    Ng7DynamicBreadcrumbModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Account Statuses',
          breadcrumb: [
            {
              name: 'Account Statuses',
              path: 'queues/account-statuses/:id/details/overview'
            }
          ]
        },
        loadChildren: () => import('./web-account-status-list/web-account-status-list.module').then((m) => m.WebAccountStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-account-status-create/web-account-status-create.module').then((m) => m.WebAccountStatusCreateModule),
      },
      {
        path: ':accountStatusId',
        component: WebAccountStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-account-status-detail/web-account-status-detail.module').then((m) => m.WebAccountStatusDetailModule),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'details'
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebAccountStatusFeatureComponent],
})
export class WebAccountStatusFeatureModule {}

