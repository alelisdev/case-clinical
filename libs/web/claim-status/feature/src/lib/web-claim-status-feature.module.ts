
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClaimStatusFeatureComponent } from './web-claim-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-claim-status-list/web-claim-status-list.module').then((m) => m.WebClaimStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-claim-status-create/web-claim-status-create.module').then((m) => m.WebClaimStatusCreateModule),
      },
      {
        path: ':claimStatusId',
        component: WebClaimStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-claim-status-detail/web-claim-status-detail.module').then((m) => m.WebClaimStatusDetailModule),
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
  declarations: [WebClaimStatusFeatureComponent],
})
export class WebClaimStatusFeatureModule {}

