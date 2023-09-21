
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPaymentTypeFeatureComponent } from './web-payment-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-payment-type-list/web-payment-type-list.module').then((m) => m.WebPaymentTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-payment-type-create/web-payment-type-create.module').then((m) => m.WebPaymentTypeCreateModule),
      },
      {
        path: ':paymentTypeId',
        component: WebPaymentTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-payment-type-detail/web-payment-type-detail.module').then((m) => m.WebPaymentTypeDetailModule),
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
  declarations: [WebPaymentTypeFeatureComponent],
})
export class WebPaymentTypeFeatureModule {}

