
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebFirmStatusFeatureComponent } from './web-firm-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-firm-status-list/web-firm-status-list.module').then((m) => m.WebFirmStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-firm-status-create/web-firm-status-create.module').then((m) => m.WebFirmStatusCreateModule),
      },
      {
        path: ':firmStatusId',
        component: WebFirmStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-firm-status-detail/web-firm-status-detail.module').then((m) => m.WebFirmStatusDetailModule),
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
  declarations: [WebFirmStatusFeatureComponent],
})
export class WebFirmStatusFeatureModule {}

