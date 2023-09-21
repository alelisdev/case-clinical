
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClaimFeatureComponent } from './web-claim-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-claim-list/web-claim-list.module').then((m) => m.WebClaimListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-claim-create/web-claim-create.module').then((m) => m.WebClaimCreateModule),
      },
      {
        path: ':claimId',
        component: WebClaimFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-claim-detail/web-claim-detail.module').then((m) => m.WebClaimDetailModule),
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
  declarations: [WebClaimFeatureComponent],
})
export class WebClaimFeatureModule {}

