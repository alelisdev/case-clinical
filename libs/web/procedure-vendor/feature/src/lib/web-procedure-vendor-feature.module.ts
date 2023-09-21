
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureVendorFeatureComponent } from './web-procedure-vendor-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-vendor-list/web-procedure-vendor-list.module').then((m) => m.WebProcedureVendorListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-vendor-create/web-procedure-vendor-create.module').then((m) => m.WebProcedureVendorCreateModule),
      },
      {
        path: ':procedureVendorId',
        component: WebProcedureVendorFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-vendor-detail/web-procedure-vendor-detail.module').then((m) => m.WebProcedureVendorDetailModule),
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
  declarations: [WebProcedureVendorFeatureComponent],
})
export class WebProcedureVendorFeatureModule {}

