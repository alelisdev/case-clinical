
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCaseProgressStatusFeatureComponent } from './web-case-progress-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-progress-status-list/web-case-progress-status-list.module').then((m) => m.WebCaseProgressStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-progress-status-create/web-case-progress-status-create.module').then((m) => m.WebCaseProgressStatusCreateModule),
      },
      {
        path: ':caseProgressStatusId',
        component: WebCaseProgressStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-progress-status-detail/web-case-progress-status-detail.module').then((m) => m.WebCaseProgressStatusDetailModule),
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
  declarations: [WebCaseProgressStatusFeatureComponent],
})
export class WebCaseProgressStatusFeatureModule {}

