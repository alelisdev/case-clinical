
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebUserCourseProgressFeatureComponent } from './web-user-course-progress-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-user-course-progress-list/web-user-course-progress-list.module').then((m) => m.WebUserCourseProgressListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-user-course-progress-create/web-user-course-progress-create.module').then((m) => m.WebUserCourseProgressCreateModule),
      },
      {
        path: ':userCourseProgressId',
        component: WebUserCourseProgressFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-user-course-progress-detail/web-user-course-progress-detail.module').then((m) => m.WebUserCourseProgressDetailModule),
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
  declarations: [WebUserCourseProgressFeatureComponent],
})
export class WebUserCourseProgressFeatureModule {}

