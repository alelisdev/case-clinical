
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCostCategoryFeatureComponent } from './web-cost-category-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-cost-category-list/web-cost-category-list.module').then((m) => m.WebCostCategoryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-cost-category-create/web-cost-category-create.module').then((m) => m.WebCostCategoryCreateModule),
      },
      {
        path: ':costCategoryId',
        component: WebCostCategoryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-cost-category-detail/web-cost-category-detail.module').then((m) => m.WebCostCategoryDetailModule),
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
  declarations: [WebCostCategoryFeatureComponent],
})
export class WebCostCategoryFeatureModule {}

