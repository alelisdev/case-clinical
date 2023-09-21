
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClinicalProviderFeatureComponent } from './web-clinical-provider-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-clinical-provider-list/web-clinical-provider-list.module').then((m) => m.WebClinicalProviderListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-clinical-provider-create/web-clinical-provider-create.module').then((m) => m.WebClinicalProviderCreateModule),
      },
      {
        path: ':clinicalProviderId',
        component: WebClinicalProviderFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-clinical-provider-detail/web-clinical-provider-detail.module').then((m) => m.WebClinicalProviderDetailModule),
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
  declarations: [WebClinicalProviderFeatureComponent],
})
export class WebClinicalProviderFeatureModule {}

