
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorAuthorizationProcedureCodeFeatureComponent } from './web-prior-authorization-procedure-code-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-authorization-procedure-code-list/web-prior-authorization-procedure-code-list.module').then((m) => m.WebPriorAuthorizationProcedureCodeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-authorization-procedure-code-create/web-prior-authorization-procedure-code-create.module').then((m) => m.WebPriorAuthorizationProcedureCodeCreateModule),
      },
      {
        path: ':priorAuthorizationProcedureCodeId',
        component: WebPriorAuthorizationProcedureCodeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-authorization-procedure-code-detail/web-prior-authorization-procedure-code-detail.module').then((m) => m.WebPriorAuthorizationProcedureCodeDetailModule),
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
  declarations: [WebPriorAuthorizationProcedureCodeFeatureComponent],
})
export class WebPriorAuthorizationProcedureCodeFeatureModule {}

