
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebUserCalendarFeatureComponent } from './web-user-calendar-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-user-calendar-list/web-user-calendar-list.module').then((m) => m.WebUserCalendarListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-user-calendar-create/web-user-calendar-create.module').then((m) => m.WebUserCalendarCreateModule),
      },
      {
        path: ':userCalendarId',
        component: WebUserCalendarFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-user-calendar-detail/web-user-calendar-detail.module').then((m) => m.WebUserCalendarDetailModule),
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
  declarations: [WebUserCalendarFeatureComponent],
})
export class WebUserCalendarFeatureModule {}

