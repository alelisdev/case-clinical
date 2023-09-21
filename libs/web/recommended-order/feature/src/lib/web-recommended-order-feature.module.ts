
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebRecommendedOrderFeatureComponent } from './web-recommended-order-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-recommended-order-list/web-recommended-order-list.module').then((m) => m.WebRecommendedOrderListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-recommended-order-create/web-recommended-order-create.module').then((m) => m.WebRecommendedOrderCreateModule),
      },
      {
        path: ':recommendedOrderId',
        component: WebRecommendedOrderFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-recommended-order-detail/web-recommended-order-detail.module').then((m) => m.WebRecommendedOrderDetailModule),
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
  declarations: [WebRecommendedOrderFeatureComponent],
})
export class WebRecommendedOrderFeatureModule {}

