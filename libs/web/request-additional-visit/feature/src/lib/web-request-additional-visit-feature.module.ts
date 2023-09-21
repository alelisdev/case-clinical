
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebRequestAdditionalVisitFeatureComponent } from './web-request-additional-visit-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-request-additional-visit-list/web-request-additional-visit-list.module').then((m) => m.WebRequestAdditionalVisitListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-request-additional-visit-create/web-request-additional-visit-create.module').then((m) => m.WebRequestAdditionalVisitCreateModule),
      },
      {
        path: ':requestAdditionalVisitId',
        component: WebRequestAdditionalVisitFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-request-additional-visit-detail/web-request-additional-visit-detail.module').then((m) => m.WebRequestAdditionalVisitDetailModule),
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
  declarations: [WebRequestAdditionalVisitFeatureComponent],
})
export class WebRequestAdditionalVisitFeatureModule {}

