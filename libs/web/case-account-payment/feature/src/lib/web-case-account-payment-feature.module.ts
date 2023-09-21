
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCaseAccountPaymentFeatureComponent } from './web-case-account-payment-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-account-payment-list/web-case-account-payment-list.module').then((m) => m.WebCaseAccountPaymentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-account-payment-create/web-case-account-payment-create.module').then((m) => m.WebCaseAccountPaymentCreateModule),
      },
      {
        path: ':caseAccountPaymentId',
        component: WebCaseAccountPaymentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-account-payment-detail/web-case-account-payment-detail.module').then((m) => m.WebCaseAccountPaymentDetailModule),
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
  declarations: [WebCaseAccountPaymentFeatureComponent],
})
export class WebCaseAccountPaymentFeatureModule {}

