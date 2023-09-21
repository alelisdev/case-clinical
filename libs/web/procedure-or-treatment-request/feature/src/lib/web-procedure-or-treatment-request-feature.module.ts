
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureOrTreatmentRequestFeatureComponent } from './web-procedure-or-treatment-request-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-or-treatment-request-list/web-procedure-or-treatment-request-list.module').then((m) => m.WebProcedureOrTreatmentRequestListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-or-treatment-request-create/web-procedure-or-treatment-request-create.module').then((m) => m.WebProcedureOrTreatmentRequestCreateModule),
      },
      {
        path: ':procedureOrTreatmentRequestId',
        component: WebProcedureOrTreatmentRequestFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-or-treatment-request-detail/web-procedure-or-treatment-request-detail.module').then((m) => m.WebProcedureOrTreatmentRequestDetailModule),
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
  declarations: [WebProcedureOrTreatmentRequestFeatureComponent],
})
export class WebProcedureOrTreatmentRequestFeatureModule {}

