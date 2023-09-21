
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCategoryFeatureComponent } from './web-category-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-category-list/web-category-list.module').then((m) => m.WebCategoryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-category-create/web-category-create.module').then((m) => m.WebCategoryCreateModule),
      },
      {
        path: ':categoryId',
        component: WebCategoryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-category-detail/web-category-detail.module').then((m) => m.WebCategoryDetailModule),
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
  declarations: [WebCategoryFeatureComponent],
})
export class WebCategoryFeatureModule {}

