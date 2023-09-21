
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebVendorFeatureComponent } from './web-vendor-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-vendor-list/web-vendor-list.module').then((m) => m.WebVendorListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-vendor-create/web-vendor-create.module').then((m) => m.WebVendorCreateModule),
      },
      {
        path: ':vendorId',
        component: WebVendorFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-vendor-detail/web-vendor-detail.module').then((m) => m.WebVendorDetailModule),
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
  declarations: [WebVendorFeatureComponent],
})
export class WebVendorFeatureModule {}

