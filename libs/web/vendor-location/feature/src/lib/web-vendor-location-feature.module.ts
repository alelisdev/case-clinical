
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebVendorLocationFeatureComponent } from './web-vendor-location-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-vendor-location-list/web-vendor-location-list.module').then((m) => m.WebVendorLocationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-vendor-location-create/web-vendor-location-create.module').then((m) => m.WebVendorLocationCreateModule),
      },
      {
        path: ':vendorLocationId',
        component: WebVendorLocationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-vendor-location-detail/web-vendor-location-detail.module').then((m) => m.WebVendorLocationDetailModule),
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
  declarations: [WebVendorLocationFeatureComponent],
})
export class WebVendorLocationFeatureModule {}

