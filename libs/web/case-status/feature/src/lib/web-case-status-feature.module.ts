
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCaseStatusFeatureComponent } from './web-case-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-status-list/web-case-status-list.module').then((m) => m.WebCaseStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-status-create/web-case-status-create.module').then((m) => m.WebCaseStatusCreateModule),
      },
      {
        path: ':caseStatusId',
        component: WebCaseStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-status-detail/web-case-status-detail.module').then((m) => m.WebCaseStatusDetailModule),
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
  declarations: [WebCaseStatusFeatureComponent],
})
export class WebCaseStatusFeatureModule {}

