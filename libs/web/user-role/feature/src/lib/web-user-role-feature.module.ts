
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebUserRoleFeatureComponent } from './web-user-role-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-user-role-list/web-user-role-list.module').then((m) => m.WebUserRoleListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-user-role-create/web-user-role-create.module').then((m) => m.WebUserRoleCreateModule),
      },
      {
        path: ':userRoleId',
        component: WebUserRoleFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-user-role-detail/web-user-role-detail.module').then((m) => m.WebUserRoleDetailModule),
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
  declarations: [WebUserRoleFeatureComponent],
})
export class WebUserRoleFeatureModule {}

