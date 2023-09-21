
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClinicalProviderLocationAvailabilityFeatureComponent } from './web-clinical-provider-location-availability-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-clinical-provider-location-availability-list/web-clinical-provider-location-availability-list.module').then((m) => m.WebClinicalProviderLocationAvailabilityListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-clinical-provider-location-availability-create/web-clinical-provider-location-availability-create.module').then((m) => m.WebClinicalProviderLocationAvailabilityCreateModule),
      },
      {
        path: ':clinicalProviderLocationAvailabilityId',
        component: WebClinicalProviderLocationAvailabilityFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-clinical-provider-location-availability-detail/web-clinical-provider-location-availability-detail.module').then((m) => m.WebClinicalProviderLocationAvailabilityDetailModule),
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
  declarations: [WebClinicalProviderLocationAvailabilityFeatureComponent],
})
export class WebClinicalProviderLocationAvailabilityFeatureModule {}

