
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCaseAccountFeatureComponent } from './web-case-account-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-account-list/web-case-account-list.module').then((m) => m.WebCaseAccountListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-account-create/web-case-account-create.module').then((m) => m.WebCaseAccountCreateModule),
      },
      {
        path: ':caseAccountId',
        component: WebCaseAccountFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-account-detail/web-case-account-detail.module').then((m) => m.WebCaseAccountDetailModule),
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
  declarations: [WebCaseAccountFeatureComponent],
})
export class WebCaseAccountFeatureModule {}

