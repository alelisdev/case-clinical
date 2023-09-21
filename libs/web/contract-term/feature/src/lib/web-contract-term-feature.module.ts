
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContractTermFeatureComponent } from './web-contract-term-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contract-term-list/web-contract-term-list.module').then((m) => m.WebContractTermListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contract-term-create/web-contract-term-create.module').then((m) => m.WebContractTermCreateModule),
      },
      {
        path: ':contractTermId',
        component: WebContractTermFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contract-term-detail/web-contract-term-detail.module').then((m) => m.WebContractTermDetailModule),
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
  declarations: [WebContractTermFeatureComponent],
})
export class WebContractTermFeatureModule {}

