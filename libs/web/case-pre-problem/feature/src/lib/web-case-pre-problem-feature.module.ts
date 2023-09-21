
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCasePreProblemFeatureComponent } from './web-case-pre-problem-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-pre-problem-list/web-case-pre-problem-list.module').then((m) => m.WebCasePreProblemListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-pre-problem-create/web-case-pre-problem-create.module').then((m) => m.WebCasePreProblemCreateModule),
      },
      {
        path: ':casePreProblemId',
        component: WebCasePreProblemFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-pre-problem-detail/web-case-pre-problem-detail.module').then((m) => m.WebCasePreProblemDetailModule),
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
  declarations: [WebCasePreProblemFeatureComponent],
})
export class WebCasePreProblemFeatureModule {}

