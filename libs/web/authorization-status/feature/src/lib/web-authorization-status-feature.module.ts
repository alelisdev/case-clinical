
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAuthorizationStatusFeatureComponent } from './web-authorization-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-authorization-status-list/web-authorization-status-list.module').then((m) => m.WebAuthorizationStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-authorization-status-create/web-authorization-status-create.module').then((m) => m.WebAuthorizationStatusCreateModule),
      },
      {
        path: ':authorizationStatusId',
        component: WebAuthorizationStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-authorization-status-detail/web-authorization-status-detail.module').then((m) => m.WebAuthorizationStatusDetailModule),
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
  declarations: [WebAuthorizationStatusFeatureComponent],
})
export class WebAuthorizationStatusFeatureModule {}

