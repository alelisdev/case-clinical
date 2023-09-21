
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCaseTypeFeatureComponent } from './web-case-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-type-list/web-case-type-list.module').then((m) => m.WebCaseTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-type-create/web-case-type-create.module').then((m) => m.WebCaseTypeCreateModule),
      },
      {
        path: ':caseTypeId',
        component: WebCaseTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-type-detail/web-case-type-detail.module').then((m) => m.WebCaseTypeDetailModule),
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
  declarations: [WebCaseTypeFeatureComponent],
})
export class WebCaseTypeFeatureModule {}

