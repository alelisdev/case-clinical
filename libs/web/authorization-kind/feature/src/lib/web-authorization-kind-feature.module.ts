
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAuthorizationKindFeatureComponent } from './web-authorization-kind-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-authorization-kind-list/web-authorization-kind-list.module').then((m) => m.WebAuthorizationKindListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-authorization-kind-create/web-authorization-kind-create.module').then((m) => m.WebAuthorizationKindCreateModule),
      },
      {
        path: ':authorizationKindId',
        component: WebAuthorizationKindFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-authorization-kind-detail/web-authorization-kind-detail.module').then((m) => m.WebAuthorizationKindDetailModule),
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
  declarations: [WebAuthorizationKindFeatureComponent],
})
export class WebAuthorizationKindFeatureModule {}

