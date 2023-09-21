
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebUserFeatureComponent } from './web-user-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-user-list/web-user-list.module').then((m) => m.WebUserListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-user-create/web-user-create.module').then((m) => m.WebUserCreateModule),
      },
      {
        path: ':userId',
        component: WebUserFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-user-detail/web-user-detail.module').then((m) => m.WebUserDetailModule),
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
  declarations: [WebUserFeatureComponent],
})
export class WebUserFeatureModule {}

