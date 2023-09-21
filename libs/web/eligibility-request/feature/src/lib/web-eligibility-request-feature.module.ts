
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebEligibilityRequestFeatureComponent } from './web-eligibility-request-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-eligibility-request-list/web-eligibility-request-list.module').then((m) => m.WebEligibilityRequestListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-eligibility-request-create/web-eligibility-request-create.module').then((m) => m.WebEligibilityRequestCreateModule),
      },
      {
        path: ':eligibilityRequestId',
        component: WebEligibilityRequestFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-eligibility-request-detail/web-eligibility-request-detail.module').then((m) => m.WebEligibilityRequestDetailModule),
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
  declarations: [WebEligibilityRequestFeatureComponent],
})
export class WebEligibilityRequestFeatureModule {}

