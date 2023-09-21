
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebBalanceRequestFeatureComponent } from './web-balance-request-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-balance-request-list/web-balance-request-list.module').then((m) => m.WebBalanceRequestListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-balance-request-create/web-balance-request-create.module').then((m) => m.WebBalanceRequestCreateModule),
      },
      {
        path: ':balanceRequestId',
        component: WebBalanceRequestFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-balance-request-detail/web-balance-request-detail.module').then((m) => m.WebBalanceRequestDetailModule),
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
  declarations: [WebBalanceRequestFeatureComponent],
})
export class WebBalanceRequestFeatureModule {}

