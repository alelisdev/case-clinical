
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebTeamUserFeatureComponent } from './web-team-user-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-team-user-list/web-team-user-list.module').then((m) => m.WebTeamUserListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-team-user-create/web-team-user-create.module').then((m) => m.WebTeamUserCreateModule),
      },
      {
        path: ':teamUserId',
        component: WebTeamUserFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-team-user-detail/web-team-user-detail.module').then((m) => m.WebTeamUserDetailModule),
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
  declarations: [WebTeamUserFeatureComponent],
})
export class WebTeamUserFeatureModule {}

