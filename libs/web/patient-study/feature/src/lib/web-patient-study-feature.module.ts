
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPatientStudyFeatureComponent } from './web-patient-study-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-patient-study-list/web-patient-study-list.module').then((m) => m.WebPatientStudyListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-patient-study-create/web-patient-study-create.module').then((m) => m.WebPatientStudyCreateModule),
      },
      {
        path: ':patientStudyId',
        component: WebPatientStudyFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-patient-study-detail/web-patient-study-detail.module').then((m) => m.WebPatientStudyDetailModule),
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
  declarations: [WebPatientStudyFeatureComponent],
})
export class WebPatientStudyFeatureModule {}

