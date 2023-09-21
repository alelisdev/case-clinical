
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebRoleFeatureComponent } from './web-role-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-role-list/web-role-list.module').then((m) => m.WebRoleListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-role-create/web-role-create.module').then((m) => m.WebRoleCreateModule),
      },
      {
        path: ':roleId',
        component: WebRoleFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-role-detail/web-role-detail.module').then((m) => m.WebRoleDetailModule),
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
  declarations: [WebRoleFeatureComponent],
})
export class WebRoleFeatureModule {}

