
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureVendorStatusFeatureComponent } from './web-procedure-vendor-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-vendor-status-list/web-procedure-vendor-status-list.module').then((m) => m.WebProcedureVendorStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-vendor-status-create/web-procedure-vendor-status-create.module').then((m) => m.WebProcedureVendorStatusCreateModule),
      },
      {
        path: ':procedureVendorStatusId',
        component: WebProcedureVendorStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-vendor-status-detail/web-procedure-vendor-status-detail.module').then((m) => m.WebProcedureVendorStatusDetailModule),
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
  declarations: [WebProcedureVendorStatusFeatureComponent],
})
export class WebProcedureVendorStatusFeatureModule {}

