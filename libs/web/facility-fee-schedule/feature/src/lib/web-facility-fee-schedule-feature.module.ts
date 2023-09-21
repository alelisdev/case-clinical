
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebFacilityFeeScheduleFeatureComponent } from './web-facility-fee-schedule-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-facility-fee-schedule-list/web-facility-fee-schedule-list.module').then((m) => m.WebFacilityFeeScheduleListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-facility-fee-schedule-create/web-facility-fee-schedule-create.module').then((m) => m.WebFacilityFeeScheduleCreateModule),
      },
      {
        path: ':facilityFeeScheduleId',
        component: WebFacilityFeeScheduleFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-facility-fee-schedule-detail/web-facility-fee-schedule-detail.module').then((m) => m.WebFacilityFeeScheduleDetailModule),
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
  declarations: [WebFacilityFeeScheduleFeatureComponent],
})
export class WebFacilityFeeScheduleFeatureModule {}

