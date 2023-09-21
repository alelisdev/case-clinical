
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebInvoiceDetailFeatureComponent } from './web-invoice-detail-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-invoice-detail-list/web-invoice-detail-list.module').then((m) => m.WebInvoiceDetailListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-invoice-detail-create/web-invoice-detail-create.module').then((m) => m.WebInvoiceDetailCreateModule),
      },
      {
        path: ':invoiceDetailId',
        component: WebInvoiceDetailFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-invoice-detail-detail/web-invoice-detail-detail.module').then((m) => m.WebInvoiceDetailDetailModule),
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
  declarations: [WebInvoiceDetailFeatureComponent],
})
export class WebInvoiceDetailFeatureModule {}

