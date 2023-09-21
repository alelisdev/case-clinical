
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContactSettingFeatureComponent } from './web-contact-setting-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contact-setting-list/web-contact-setting-list.module').then((m) => m.WebContactSettingListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contact-setting-create/web-contact-setting-create.module').then((m) => m.WebContactSettingCreateModule),
      },
      {
        path: ':contactSettingId',
        component: WebContactSettingFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contact-setting-detail/web-contact-setting-detail.module').then((m) => m.WebContactSettingDetailModule),
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
  declarations: [WebContactSettingFeatureComponent],
})
export class WebContactSettingFeatureModule {}

