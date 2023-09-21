
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebRecommendedOrderDiagnosisCodeFeatureComponent } from './web-recommended-order-diagnosis-code-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-recommended-order-diagnosis-code-list/web-recommended-order-diagnosis-code-list.module').then((m) => m.WebRecommendedOrderDiagnosisCodeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-recommended-order-diagnosis-code-create/web-recommended-order-diagnosis-code-create.module').then((m) => m.WebRecommendedOrderDiagnosisCodeCreateModule),
      },
      {
        path: ':recommendedOrderDiagnosisCodeId',
        component: WebRecommendedOrderDiagnosisCodeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-recommended-order-diagnosis-code-detail/web-recommended-order-diagnosis-code-detail.module').then((m) => m.WebRecommendedOrderDiagnosisCodeDetailModule),
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
  declarations: [WebRecommendedOrderDiagnosisCodeFeatureComponent],
})
export class WebRecommendedOrderDiagnosisCodeFeatureModule {}

