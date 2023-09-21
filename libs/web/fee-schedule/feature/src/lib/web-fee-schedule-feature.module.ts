
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebFeeScheduleFeatureComponent } from './web-fee-schedule-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-fee-schedule-list/web-fee-schedule-list.module').then((m) => m.WebFeeScheduleListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-fee-schedule-create/web-fee-schedule-create.module').then((m) => m.WebFeeScheduleCreateModule),
      },
      {
        path: ':feeScheduleId',
        component: WebFeeScheduleFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-fee-schedule-detail/web-fee-schedule-detail.module').then((m) => m.WebFeeScheduleDetailModule),
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
  declarations: [WebFeeScheduleFeatureComponent],
})
export class WebFeeScheduleFeatureModule {}

