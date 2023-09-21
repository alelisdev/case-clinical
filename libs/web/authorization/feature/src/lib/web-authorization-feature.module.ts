
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAuthorizationFeatureComponent } from './web-authorization-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-authorization-list/web-authorization-list.module').then((m) => m.WebAuthorizationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-authorization-create/web-authorization-create.module').then((m) => m.WebAuthorizationCreateModule),
      },
      {
        path: ':authorizationId',
        component: WebAuthorizationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-authorization-detail/web-authorization-detail.module').then((m) => m.WebAuthorizationDetailModule),
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
  declarations: [WebAuthorizationFeatureComponent],
})
export class WebAuthorizationFeatureModule {}

