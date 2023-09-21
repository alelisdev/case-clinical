
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebNotificationFeatureComponent } from './web-notification-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-notification-list/web-notification-list.module').then((m) => m.WebNotificationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-notification-create/web-notification-create.module').then((m) => m.WebNotificationCreateModule),
      },
      {
        path: ':notificationId',
        component: WebNotificationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-notification-detail/web-notification-detail.module').then((m) => m.WebNotificationDetailModule),
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
  declarations: [WebNotificationFeatureComponent],
})
export class WebNotificationFeatureModule {}

