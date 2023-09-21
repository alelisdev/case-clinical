
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContractFeatureComponent } from './web-contract-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contract-list/web-contract-list.module').then((m) => m.WebContractListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contract-create/web-contract-create.module').then((m) => m.WebContractCreateModule),
      },
      {
        path: ':contractId',
        component: WebContractFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contract-detail/web-contract-detail.module').then((m) => m.WebContractDetailModule),
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
  declarations: [WebContractFeatureComponent],
})
export class WebContractFeatureModule {}

