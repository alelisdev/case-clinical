
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebHealthInsuranceFeatureComponent } from './web-health-insurance-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-health-insurance-list/web-health-insurance-list.module').then((m) => m.WebHealthInsuranceListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-health-insurance-create/web-health-insurance-create.module').then((m) => m.WebHealthInsuranceCreateModule),
      },
      {
        path: ':healthInsuranceId',
        component: WebHealthInsuranceFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-health-insurance-detail/web-health-insurance-detail.module').then((m) => m.WebHealthInsuranceDetailModule),
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
  declarations: [WebHealthInsuranceFeatureComponent],
})
export class WebHealthInsuranceFeatureModule {}

