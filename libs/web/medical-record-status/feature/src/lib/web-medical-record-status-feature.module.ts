
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebMedicalRecordStatusFeatureComponent } from './web-medical-record-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-medical-record-status-list/web-medical-record-status-list.module').then((m) => m.WebMedicalRecordStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-medical-record-status-create/web-medical-record-status-create.module').then((m) => m.WebMedicalRecordStatusCreateModule),
      },
      {
        path: ':medicalRecordStatusId',
        component: WebMedicalRecordStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-medical-record-status-detail/web-medical-record-status-detail.module').then((m) => m.WebMedicalRecordStatusDetailModule),
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
  declarations: [WebMedicalRecordStatusFeatureComponent],
})
export class WebMedicalRecordStatusFeatureModule {}

