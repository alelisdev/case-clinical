
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebSettingFeatureComponent } from './web-setting-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-setting-list/web-setting-list.module').then((m) => m.WebSettingListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-setting-create/web-setting-create.module').then((m) => m.WebSettingCreateModule),
      },
      {
        path: ':settingId',
        component: WebSettingFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-setting-detail/web-setting-detail.module').then((m) => m.WebSettingDetailModule),
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
  declarations: [WebSettingFeatureComponent],
})
export class WebSettingFeatureModule {}

