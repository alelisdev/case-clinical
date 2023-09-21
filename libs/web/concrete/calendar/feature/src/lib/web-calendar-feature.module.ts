
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebCalendarFeatureComponent } from './web-calendar-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-calendar-list/web-calendar-list.module').then((m) => m.WebCalendarListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-calendar-create/web-calendar-create.module').then((m) => m.WebCalendarCreateModule),
      },
      {
        path: ':calendarId',
        component: WebCalendarFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-calendar-detail/web-calendar-detail.module').then((m) => m.WebCalendarDetailModule),
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
  declarations: [WebCalendarFeatureComponent],
})
export class WebCalendarFeatureModule {}

