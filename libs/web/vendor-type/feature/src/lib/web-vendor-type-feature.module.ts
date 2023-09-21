
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebVendorTypeFeatureComponent } from './web-vendor-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-vendor-type-list/web-vendor-type-list.module').then((m) => m.WebVendorTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-vendor-type-create/web-vendor-type-create.module').then((m) => m.WebVendorTypeCreateModule),
      },
      {
        path: ':vendorTypeId',
        component: WebVendorTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-vendor-type-detail/web-vendor-type-detail.module').then((m) => m.WebVendorTypeDetailModule),
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
  declarations: [WebVendorTypeFeatureComponent],
})
export class WebVendorTypeFeatureModule {}

