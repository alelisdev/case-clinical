
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebTeamRoleFeatureComponent } from './web-team-role-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-team-role-list/web-team-role-list.module').then((m) => m.WebTeamRoleListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-team-role-create/web-team-role-create.module').then((m) => m.WebTeamRoleCreateModule),
      },
      {
        path: ':teamRoleId',
        component: WebTeamRoleFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-team-role-detail/web-team-role-detail.module').then((m) => m.WebTeamRoleDetailModule),
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
  declarations: [WebTeamRoleFeatureComponent],
})
export class WebTeamRoleFeatureModule {}

