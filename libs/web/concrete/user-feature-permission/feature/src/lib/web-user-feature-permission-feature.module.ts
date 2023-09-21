
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebUserFeaturePermissionFeatureComponent } from './web-user-feature-permission-feature.component'
import { UiFormsSharedModule } from 'libs/web/ui-forms-shared.module'

@NgModule({
  imports: [
    CommonModule,
    UiFormsSharedModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-user-feature-permission-list/web-user-feature-permission-list.module').then((m) => m.WebUserFeaturePermissionListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-user-feature-permission-create/web-user-feature-permission-create.module').then((m) => m.WebUserFeaturePermissionCreateModule),
      },
      {
        path: ':userFeaturePermissionId',
        component: WebUserFeaturePermissionFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-user-feature-permission-detail/web-user-feature-permission-detail.module').then((m) => m.WebUserFeaturePermissionDetailModule),
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
  declarations: [WebUserFeaturePermissionFeatureComponent],
})
export class WebUserFeaturePermissionFeatureModule {}

