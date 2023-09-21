
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPayorTypeFeatureComponent } from './web-payor-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-payor-type-list/web-payor-type-list.module').then((m) => m.WebPayorTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-payor-type-create/web-payor-type-create.module').then((m) => m.WebPayorTypeCreateModule),
      },
      {
        path: ':payorTypeId',
        component: WebPayorTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-payor-type-detail/web-payor-type-detail.module').then((m) => m.WebPayorTypeDetailModule),
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
  declarations: [WebPayorTypeFeatureComponent],
})
export class WebPayorTypeFeatureModule {}

