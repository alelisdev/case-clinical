
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebImplantCategoryFeatureComponent } from './web-implant-category-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-implant-category-list/web-implant-category-list.module').then((m) => m.WebImplantCategoryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-implant-category-create/web-implant-category-create.module').then((m) => m.WebImplantCategoryCreateModule),
      },
      {
        path: ':implantCategoryId',
        component: WebImplantCategoryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-implant-category-detail/web-implant-category-detail.module').then((m) => m.WebImplantCategoryDetailModule),
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
  declarations: [WebImplantCategoryFeatureComponent],
})
export class WebImplantCategoryFeatureModule {}

