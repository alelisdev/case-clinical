
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebMedicalConditionFeatureComponent } from './web-medical-condition-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-medical-condition-list/web-medical-condition-list.module').then((m) => m.WebMedicalConditionListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-medical-condition-create/web-medical-condition-create.module').then((m) => m.WebMedicalConditionCreateModule),
      },
      {
        path: ':medicalConditionId',
        component: WebMedicalConditionFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-medical-condition-detail/web-medical-condition-detail.module').then((m) => m.WebMedicalConditionDetailModule),
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
  declarations: [WebMedicalConditionFeatureComponent],
})
export class WebMedicalConditionFeatureModule {}

