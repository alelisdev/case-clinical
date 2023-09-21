
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAuthorizationTypeFeatureComponent } from './web-authorization-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-authorization-type-list/web-authorization-type-list.module').then((m) => m.WebAuthorizationTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-authorization-type-create/web-authorization-type-create.module').then((m) => m.WebAuthorizationTypeCreateModule),
      },
      {
        path: ':authorizationTypeId',
        component: WebAuthorizationTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-authorization-type-detail/web-authorization-type-detail.module').then((m) => m.WebAuthorizationTypeDetailModule),
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
  declarations: [WebAuthorizationTypeFeatureComponent],
})
export class WebAuthorizationTypeFeatureModule {}

