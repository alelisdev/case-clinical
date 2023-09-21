
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContractedRateFeatureComponent } from './web-contracted-rate-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contracted-rate-list/web-contracted-rate-list.module').then((m) => m.WebContractedRateListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contracted-rate-create/web-contracted-rate-create.module').then((m) => m.WebContractedRateCreateModule),
      },
      {
        path: ':contractedRateId',
        component: WebContractedRateFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contracted-rate-detail/web-contracted-rate-detail.module').then((m) => m.WebContractedRateDetailModule),
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
  declarations: [WebContractedRateFeatureComponent],
})
export class WebContractedRateFeatureModule {}

