
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAuthorizationCategoryFeatureComponent } from './web-authorization-category-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-authorization-category-list/web-authorization-category-list.module').then((m) => m.WebAuthorizationCategoryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-authorization-category-create/web-authorization-category-create.module').then((m) => m.WebAuthorizationCategoryCreateModule),
      },
      {
        path: ':authorizationCategoryId',
        component: WebAuthorizationCategoryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-authorization-category-detail/web-authorization-category-detail.module').then((m) => m.WebAuthorizationCategoryDetailModule),
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
  declarations: [WebAuthorizationCategoryFeatureComponent],
})
export class WebAuthorizationCategoryFeatureModule {}

