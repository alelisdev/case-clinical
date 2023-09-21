
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebReviewFeatureComponent } from './web-review-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-review-list/web-review-list.module').then((m) => m.WebReviewListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-review-create/web-review-create.module').then((m) => m.WebReviewCreateModule),
      },
      {
        path: ':reviewId',
        component: WebReviewFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-review-detail/web-review-detail.module').then((m) => m.WebReviewDetailModule),
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
  declarations: [WebReviewFeatureComponent],
})
export class WebReviewFeatureModule {}

