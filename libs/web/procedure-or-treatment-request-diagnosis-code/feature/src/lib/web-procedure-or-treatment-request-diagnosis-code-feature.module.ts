
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureOrTreatmentRequestDiagnosisCodeFeatureComponent } from './web-procedure-or-treatment-request-diagnosis-code-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-or-treatment-request-diagnosis-code-list/web-procedure-or-treatment-request-diagnosis-code-list.module').then((m) => m.WebProcedureOrTreatmentRequestDiagnosisCodeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-or-treatment-request-diagnosis-code-create/web-procedure-or-treatment-request-diagnosis-code-create.module').then((m) => m.WebProcedureOrTreatmentRequestDiagnosisCodeCreateModule),
      },
      {
        path: ':procedureOrTreatmentRequestDiagnosisCodeId',
        component: WebProcedureOrTreatmentRequestDiagnosisCodeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-or-treatment-request-diagnosis-code-detail/web-procedure-or-treatment-request-diagnosis-code-detail.module').then((m) => m.WebProcedureOrTreatmentRequestDiagnosisCodeDetailModule),
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
  declarations: [WebProcedureOrTreatmentRequestDiagnosisCodeFeatureComponent],
})
export class WebProcedureOrTreatmentRequestDiagnosisCodeFeatureModule {}

