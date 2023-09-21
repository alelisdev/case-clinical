
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClinicalProviderTagFeatureComponent } from './web-clinical-provider-tag-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-clinical-provider-tag-list/web-clinical-provider-tag-list.module').then((m) => m.WebClinicalProviderTagListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-clinical-provider-tag-create/web-clinical-provider-tag-create.module').then((m) => m.WebClinicalProviderTagCreateModule),
      },
      {
        path: ':clinicalProviderTagId',
        component: WebClinicalProviderTagFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-clinical-provider-tag-detail/web-clinical-provider-tag-detail.module').then((m) => m.WebClinicalProviderTagDetailModule),
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
  declarations: [WebClinicalProviderTagFeatureComponent],
})
export class WebClinicalProviderTagFeatureModule {}

