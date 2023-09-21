
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebInsuranceTypeFeatureComponent } from './web-insurance-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-insurance-type-list/web-insurance-type-list.module').then((m) => m.WebInsuranceTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-insurance-type-create/web-insurance-type-create.module').then((m) => m.WebInsuranceTypeCreateModule),
      },
      {
        path: ':insuranceTypeId',
        component: WebInsuranceTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-insurance-type-detail/web-insurance-type-detail.module').then((m) => m.WebInsuranceTypeDetailModule),
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
  declarations: [WebInsuranceTypeFeatureComponent],
})
export class WebInsuranceTypeFeatureModule {}

