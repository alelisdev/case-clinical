
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorAuthorizationRequestFeatureComponent } from './web-prior-authorization-request-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-authorization-request-list/web-prior-authorization-request-list.module').then((m) => m.WebPriorAuthorizationRequestListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-authorization-request-create/web-prior-authorization-request-create.module').then((m) => m.WebPriorAuthorizationRequestCreateModule),
      },
      {
        path: ':priorAuthorizationRequestId',
        component: WebPriorAuthorizationRequestFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-authorization-request-detail/web-prior-authorization-request-detail.module').then((m) => m.WebPriorAuthorizationRequestDetailModule),
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
  declarations: [WebPriorAuthorizationRequestFeatureComponent],
})
export class WebPriorAuthorizationRequestFeatureModule {}

