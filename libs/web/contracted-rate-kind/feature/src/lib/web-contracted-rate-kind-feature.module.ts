
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContractedRateKindFeatureComponent } from './web-contracted-rate-kind-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contracted-rate-kind-list/web-contracted-rate-kind-list.module').then((m) => m.WebContractedRateKindListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contracted-rate-kind-create/web-contracted-rate-kind-create.module').then((m) => m.WebContractedRateKindCreateModule),
      },
      {
        path: ':contractedRateKindId',
        component: WebContractedRateKindFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contracted-rate-kind-detail/web-contracted-rate-kind-detail.module').then((m) => m.WebContractedRateKindDetailModule),
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
  declarations: [WebContractedRateKindFeatureComponent],
})
export class WebContractedRateKindFeatureModule {}

