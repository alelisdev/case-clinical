
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebInvoiceFeatureComponent } from './web-invoice-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-invoice-list/web-invoice-list.module').then((m) => m.WebInvoiceListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-invoice-create/web-invoice-create.module').then((m) => m.WebInvoiceCreateModule),
      },
      {
        path: ':invoiceId',
        component: WebInvoiceFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-invoice-detail/web-invoice-detail.module').then((m) => m.WebInvoiceDetailModule),
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
  declarations: [WebInvoiceFeatureComponent],
})
export class WebInvoiceFeatureModule {}

