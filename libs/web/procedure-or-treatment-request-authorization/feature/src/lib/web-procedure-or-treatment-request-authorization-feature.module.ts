
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureOrTreatmentRequestAuthorizationFeatureComponent } from './web-procedure-or-treatment-request-authorization-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-or-treatment-request-authorization-list/web-procedure-or-treatment-request-authorization-list.module').then((m) => m.WebProcedureOrTreatmentRequestAuthorizationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-or-treatment-request-authorization-create/web-procedure-or-treatment-request-authorization-create.module').then((m) => m.WebProcedureOrTreatmentRequestAuthorizationCreateModule),
      },
      {
        path: ':procedureOrTreatmentRequestAuthorizationId',
        component: WebProcedureOrTreatmentRequestAuthorizationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-or-treatment-request-authorization-detail/web-procedure-or-treatment-request-authorization-detail.module').then((m) => m.WebProcedureOrTreatmentRequestAuthorizationDetailModule),
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
  declarations: [WebProcedureOrTreatmentRequestAuthorizationFeatureComponent],
})
export class WebProcedureOrTreatmentRequestAuthorizationFeatureModule {}

