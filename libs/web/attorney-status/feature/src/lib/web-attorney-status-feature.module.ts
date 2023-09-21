
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAttorneyStatusFeatureComponent } from './web-attorney-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-attorney-status-list/web-attorney-status-list.module').then((m) => m.WebAttorneyStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-attorney-status-create/web-attorney-status-create.module').then((m) => m.WebAttorneyStatusCreateModule),
      },
      {
        path: ':attorneyStatusId',
        component: WebAttorneyStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-attorney-status-detail/web-attorney-status-detail.module').then((m) => m.WebAttorneyStatusDetailModule),
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
  declarations: [WebAttorneyStatusFeatureComponent],
})
export class WebAttorneyStatusFeatureModule {}

