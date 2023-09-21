
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAgreementTypeFeatureComponent } from './web-agreement-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-agreement-type-list/web-agreement-type-list.module').then((m) => m.WebAgreementTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-agreement-type-create/web-agreement-type-create.module').then((m) => m.WebAgreementTypeCreateModule),
      },
      {
        path: ':agreementTypeId',
        component: WebAgreementTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-agreement-type-detail/web-agreement-type-detail.module').then((m) => m.WebAgreementTypeDetailModule),
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
  declarations: [WebAgreementTypeFeatureComponent],
})
export class WebAgreementTypeFeatureModule {}

