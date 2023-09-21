
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPatientTreatmentStatusFeatureComponent } from './web-patient-treatment-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-patient-treatment-status-list/web-patient-treatment-status-list.module').then((m) => m.WebPatientTreatmentStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-patient-treatment-status-create/web-patient-treatment-status-create.module').then((m) => m.WebPatientTreatmentStatusCreateModule),
      },
      {
        path: ':patientTreatmentStatusId',
        component: WebPatientTreatmentStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-patient-treatment-status-detail/web-patient-treatment-status-detail.module').then((m) => m.WebPatientTreatmentStatusDetailModule),
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
  declarations: [WebPatientTreatmentStatusFeatureComponent],
})
export class WebPatientTreatmentStatusFeatureModule {}
