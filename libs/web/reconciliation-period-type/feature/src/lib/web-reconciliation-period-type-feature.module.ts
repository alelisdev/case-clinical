
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebReconciliationPeriodTypeFeatureComponent } from './web-reconciliation-period-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-reconciliation-period-type-list/web-reconciliation-period-type-list.module').then((m) => m.WebReconciliationPeriodTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-reconciliation-period-type-create/web-reconciliation-period-type-create.module').then((m) => m.WebReconciliationPeriodTypeCreateModule),
      },
      {
        path: ':reconciliationPeriodTypeId',
        component: WebReconciliationPeriodTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-reconciliation-period-type-detail/web-reconciliation-period-type-detail.module').then((m) => m.WebReconciliationPeriodTypeDetailModule),
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
  declarations: [WebReconciliationPeriodTypeFeatureComponent],
})
export class WebReconciliationPeriodTypeFeatureModule {}

