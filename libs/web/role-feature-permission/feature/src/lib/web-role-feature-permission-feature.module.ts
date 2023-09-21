
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebRoleFeaturePermissionFeatureComponent } from './web-role-feature-permission-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-role-feature-permission-list/web-role-feature-permission-list.module').then((m) => m.WebRoleFeaturePermissionListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-role-feature-permission-create/web-role-feature-permission-create.module').then((m) => m.WebRoleFeaturePermissionCreateModule),
      },
      {
        path: ':roleFeaturePermissionId',
        component: WebRoleFeaturePermissionFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-role-feature-permission-detail/web-role-feature-permission-detail.module').then((m) => m.WebRoleFeaturePermissionDetailModule),
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
  declarations: [WebRoleFeaturePermissionFeatureComponent],
})
export class WebRoleFeaturePermissionFeatureModule {}

