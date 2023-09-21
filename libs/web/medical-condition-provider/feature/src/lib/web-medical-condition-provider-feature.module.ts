
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebMedicalConditionProviderFeatureComponent } from './web-medical-condition-provider-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-medical-condition-provider-list/web-medical-condition-provider-list.module').then((m) => m.WebMedicalConditionProviderListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-medical-condition-provider-create/web-medical-condition-provider-create.module').then((m) => m.WebMedicalConditionProviderCreateModule),
      },
      {
        path: ':medicalConditionProviderId',
        component: WebMedicalConditionProviderFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-medical-condition-provider-detail/web-medical-condition-provider-detail.module').then((m) => m.WebMedicalConditionProviderDetailModule),
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
  declarations: [WebMedicalConditionProviderFeatureComponent],
})
export class WebMedicalConditionProviderFeatureModule {}

