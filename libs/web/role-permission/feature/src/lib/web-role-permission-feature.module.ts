
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebRolePermissionFeatureComponent } from './web-role-permission-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-role-permission-list/web-role-permission-list.module').then((m) => m.WebRolePermissionListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-role-permission-create/web-role-permission-create.module').then((m) => m.WebRolePermissionCreateModule),
      },
      {
        path: ':rolePermissionId',
        component: WebRolePermissionFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-role-permission-detail/web-role-permission-detail.module').then((m) => m.WebRolePermissionDetailModule),
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
  declarations: [WebRolePermissionFeatureComponent],
})
export class WebRolePermissionFeatureModule {}

