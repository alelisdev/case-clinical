
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebInsuranceFeatureComponent } from './web-insurance-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-insurance-list/web-insurance-list.module').then((m) => m.WebInsuranceListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-insurance-create/web-insurance-create.module').then((m) => m.WebInsuranceCreateModule),
      },
      {
        path: ':insuranceId',
        component: WebInsuranceFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-insurance-detail/web-insurance-detail.module').then((m) => m.WebInsuranceDetailModule),
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
  declarations: [WebInsuranceFeatureComponent],
})
export class WebInsuranceFeatureModule {}

