
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPaymentFeatureComponent } from './web-payment-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-payment-list/web-payment-list.module').then((m) => m.WebPaymentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-payment-create/web-payment-create.module').then((m) => m.WebPaymentCreateModule),
      },
      {
        path: ':paymentId',
        component: WebPaymentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-payment-detail/web-payment-detail.module').then((m) => m.WebPaymentDetailModule),
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
  declarations: [WebPaymentFeatureComponent],
})
export class WebPaymentFeatureModule {}

