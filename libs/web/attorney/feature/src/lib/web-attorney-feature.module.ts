
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAttorneyFeatureComponent } from './web-attorney-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-attorney-list/web-attorney-list.module').then((m) => m.WebAttorneyListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-attorney-create/web-attorney-create.module').then((m) => m.WebAttorneyCreateModule),
      },
      {
        path: ':attorneyId',
        component: WebAttorneyFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-attorney-detail/web-attorney-detail.module').then((m) => m.WebAttorneyDetailModule),
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
  declarations: [WebAttorneyFeatureComponent],
})
export class WebAttorneyFeatureModule {}

