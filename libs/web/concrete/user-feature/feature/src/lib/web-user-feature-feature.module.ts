
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebUserFeatureFeatureComponent } from './web-user-feature-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-user-feature-list/web-user-feature-list.module').then((m) => m.WebUserFeatureListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-user-feature-create/web-user-feature-create.module').then((m) => m.WebUserFeatureCreateModule),
      },
      {
        path: ':userFeatureId',
        component: WebUserFeatureFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-user-feature-detail/web-user-feature-detail.module').then((m) => m.WebUserFeatureDetailModule),
          },
          {
            path: '',
            redirectTo: 'details',
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebUserFeatureFeatureComponent],
})
export class WebUserFeatureFeatureModule {}

