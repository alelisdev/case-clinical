
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebCalendarTypeFeatureComponent } from './web-calendar-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-calendar-type-list/web-calendar-type-list.module').then((m) => m.WebCalendarTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-calendar-type-create/web-calendar-type-create.module').then((m) => m.WebCalendarTypeCreateModule),
      },
      {
        path: ':calendarTypeId',
        component: WebCalendarTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-calendar-type-detail/web-calendar-type-detail.module').then((m) => m.WebCalendarTypeDetailModule),
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
  declarations: [WebCalendarTypeFeatureComponent],
})
export class WebCalendarTypeFeatureModule {}

