
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAdverseInsuranceStatusFeatureComponent } from './web-adverse-insurance-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-adverse-insurance-status-list/web-adverse-insurance-status-list.module').then((m) => m.WebAdverseInsuranceStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-adverse-insurance-status-create/web-adverse-insurance-status-create.module').then((m) => m.WebAdverseInsuranceStatusCreateModule),
      },
      {
        path: ':adverseInsuranceStatusId',
        component: WebAdverseInsuranceStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-adverse-insurance-status-detail/web-adverse-insurance-status-detail.module').then((m) => m.WebAdverseInsuranceStatusDetailModule),
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
  declarations: [WebAdverseInsuranceStatusFeatureComponent],
})
export class WebAdverseInsuranceStatusFeatureModule {}

