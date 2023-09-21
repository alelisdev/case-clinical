
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebCalendarWeekdayFeatureComponent } from './web-calendar-weekday-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-calendar-weekday-list/web-calendar-weekday-list.module').then((m) => m.WebCalendarWeekdayListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-calendar-weekday-create/web-calendar-weekday-create.module').then((m) => m.WebCalendarWeekdayCreateModule),
      },
      {
        path: ':calendarWeekdayId',
        component: WebCalendarWeekdayFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-calendar-weekday-detail/web-calendar-weekday-detail.module').then((m) => m.WebCalendarWeekdayDetailModule),
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
  declarations: [WebCalendarWeekdayFeatureComponent],
})
export class WebCalendarWeekdayFeatureModule {}

