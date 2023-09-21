
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebTeamFeatureComponent } from './web-team-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-team-list/web-team-list.module').then((m) => m.WebTeamListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-team-create/web-team-create.module').then((m) => m.WebTeamCreateModule),
      },
      {
        path: ':teamId',
        component: WebTeamFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-team-detail/web-team-detail.module').then((m) => m.WebTeamDetailModule),
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
  declarations: [WebTeamFeatureComponent],
})
export class WebTeamFeatureModule {}

