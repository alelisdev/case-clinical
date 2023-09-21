
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebEligibilityStatusFeatureComponent } from './web-eligibility-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-eligibility-status-list/web-eligibility-status-list.module').then((m) => m.WebEligibilityStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-eligibility-status-create/web-eligibility-status-create.module').then((m) => m.WebEligibilityStatusCreateModule),
      },
      {
        path: ':eligibilityStatusId',
        component: WebEligibilityStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-eligibility-status-detail/web-eligibility-status-detail.module').then((m) => m.WebEligibilityStatusDetailModule),
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
  declarations: [WebEligibilityStatusFeatureComponent],
})
export class WebEligibilityStatusFeatureModule {}

