
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContractKindFeatureComponent } from './web-contract-kind-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contract-kind-list/web-contract-kind-list.module').then((m) => m.WebContractKindListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contract-kind-create/web-contract-kind-create.module').then((m) => m.WebContractKindCreateModule),
      },
      {
        path: ':contractKindId',
        component: WebContractKindFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contract-kind-detail/web-contract-kind-detail.module').then((m) => m.WebContractKindDetailModule),
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
  declarations: [WebContractKindFeatureComponent],
})
export class WebContractKindFeatureModule {}

