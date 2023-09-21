
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebRecommendedOrderAuthorizationFeatureComponent } from './web-recommended-order-authorization-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-recommended-order-authorization-list/web-recommended-order-authorization-list.module').then((m) => m.WebRecommendedOrderAuthorizationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-recommended-order-authorization-create/web-recommended-order-authorization-create.module').then((m) => m.WebRecommendedOrderAuthorizationCreateModule),
      },
      {
        path: ':recommendedOrderAuthorizationId',
        component: WebRecommendedOrderAuthorizationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-recommended-order-authorization-detail/web-recommended-order-authorization-detail.module').then((m) => m.WebRecommendedOrderAuthorizationDetailModule),
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
  declarations: [WebRecommendedOrderAuthorizationFeatureComponent],
})
export class WebRecommendedOrderAuthorizationFeatureModule {}

