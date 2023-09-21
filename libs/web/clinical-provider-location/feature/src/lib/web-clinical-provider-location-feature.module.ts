
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClinicalProviderLocationFeatureComponent } from './web-clinical-provider-location-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-clinical-provider-location-list/web-clinical-provider-location-list.module').then((m) => m.WebClinicalProviderLocationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-clinical-provider-location-create/web-clinical-provider-location-create.module').then((m) => m.WebClinicalProviderLocationCreateModule),
      },
      {
        path: ':clinicalProviderLocationId',
        component: WebClinicalProviderLocationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-clinical-provider-location-detail/web-clinical-provider-location-detail.module').then((m) => m.WebClinicalProviderLocationDetailModule),
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
  declarations: [WebClinicalProviderLocationFeatureComponent],
})
export class WebClinicalProviderLocationFeatureModule {}

