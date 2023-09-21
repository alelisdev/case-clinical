
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebInsuranceSectorFeatureComponent } from './web-insurance-sector-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-insurance-sector-list/web-insurance-sector-list.module').then((m) => m.WebInsuranceSectorListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-insurance-sector-create/web-insurance-sector-create.module').then((m) => m.WebInsuranceSectorCreateModule),
      },
      {
        path: ':insuranceSectorId',
        component: WebInsuranceSectorFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-insurance-sector-detail/web-insurance-sector-detail.module').then((m) => m.WebInsuranceSectorDetailModule),
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
  declarations: [WebInsuranceSectorFeatureComponent],
})
export class WebInsuranceSectorFeatureModule {}

