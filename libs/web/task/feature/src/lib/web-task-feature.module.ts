
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebTaskFeatureComponent } from './web-task-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-task-list/web-task-list.module').then((m) => m.WebTaskListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-task-create/web-task-create.module').then((m) => m.WebTaskCreateModule),
      },
      {
        path: ':taskId',
        component: WebTaskFeatureComponent,
        children: [
          {
            path: 'edit',
            loadChildren: () => import('./web-task-edit/web-task-edit.module').then((m) => m.WebTaskEditModule),
          },
          {
            path: 'details',
            loadChildren: () =>
              import('./web-task-detail/web-task-detail.module').then((m) => m.WebTaskDetailModule),
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
  declarations: [WebTaskFeatureComponent],
})
export class WebTaskFeatureModule {}

