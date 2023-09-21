
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClinicalProviderSpecialtyFeatureComponent } from './web-clinical-provider-specialty-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-clinical-provider-specialty-list/web-clinical-provider-specialty-list.module').then((m) => m.WebClinicalProviderSpecialtyListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-clinical-provider-specialty-create/web-clinical-provider-specialty-create.module').then((m) => m.WebClinicalProviderSpecialtyCreateModule),
      },
      {
        path: ':clinicalProviderSpecialtyId',
        component: WebClinicalProviderSpecialtyFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-clinical-provider-specialty-detail/web-clinical-provider-specialty-detail.module').then((m) => m.WebClinicalProviderSpecialtyDetailModule),
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
  declarations: [WebClinicalProviderSpecialtyFeatureComponent],
})
export class WebClinicalProviderSpecialtyFeatureModule {}

