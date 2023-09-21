
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClinicalProviderServiceFeatureComponent } from './web-clinical-provider-service-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-clinical-provider-service-list/web-clinical-provider-service-list.module').then((m) => m.WebClinicalProviderServiceListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-clinical-provider-service-create/web-clinical-provider-service-create.module').then((m) => m.WebClinicalProviderServiceCreateModule),
      },
      {
        path: ':clinicalProviderServiceId',
        component: WebClinicalProviderServiceFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-clinical-provider-service-detail/web-clinical-provider-service-detail.module').then((m) => m.WebClinicalProviderServiceDetailModule),
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
  declarations: [WebClinicalProviderServiceFeatureComponent],
})
export class WebClinicalProviderServiceFeatureModule {}

