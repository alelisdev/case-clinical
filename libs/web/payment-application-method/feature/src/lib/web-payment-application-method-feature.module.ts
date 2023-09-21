
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPaymentApplicationMethodFeatureComponent } from './web-payment-application-method-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-payment-application-method-list/web-payment-application-method-list.module').then((m) => m.WebPaymentApplicationMethodListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-payment-application-method-create/web-payment-application-method-create.module').then((m) => m.WebPaymentApplicationMethodCreateModule),
      },
      {
        path: ':paymentApplicationMethodId',
        component: WebPaymentApplicationMethodFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-payment-application-method-detail/web-payment-application-method-detail.module').then((m) => m.WebPaymentApplicationMethodDetailModule),
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
  declarations: [WebPaymentApplicationMethodFeatureComponent],
})
export class WebPaymentApplicationMethodFeatureModule {}

