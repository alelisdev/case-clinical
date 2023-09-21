
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPatientFeatureComponent } from './web-patient-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-patient-list/web-patient-list.module').then((m) => m.WebPatientListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-patient-create/web-patient-create.module').then((m) => m.WebPatientCreateModule),
      },
      {
        path: ':patientId',
        component: WebPatientFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-patient-detail/web-patient-detail.module').then((m) => m.WebPatientDetailModule),
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
  declarations: [WebPatientFeatureComponent],
})
export class WebPatientFeatureModule {}

