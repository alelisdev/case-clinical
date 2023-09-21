
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebReferralRequestFeatureComponent } from './web-referral-request-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-referral-request-list/web-referral-request-list.module').then((m) => m.WebReferralRequestListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-referral-request-create/web-referral-request-create.module').then((m) => m.WebReferralRequestCreateModule),
      },
      {
        path: ':referralRequestId',
        component: WebReferralRequestFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-referral-request-detail/web-referral-request-detail.module').then((m) => m.WebReferralRequestDetailModule),
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
  declarations: [WebReferralRequestFeatureComponent],
})
export class WebReferralRequestFeatureModule {}

