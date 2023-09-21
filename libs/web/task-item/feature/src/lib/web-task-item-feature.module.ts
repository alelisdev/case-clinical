
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebTaskItemFeatureComponent } from './web-task-item-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-task-item-list/web-task-item-list.module').then((m) => m.WebTaskItemListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-task-item-create/web-task-item-create.module').then((m) => m.WebTaskItemCreateModule),
      },
      {
        path: ':taskItemId',
        component: WebTaskItemFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-task-item-detail/web-task-item-detail.module').then((m) => m.WebTaskItemDetailModule),
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
  declarations: [WebTaskItemFeatureComponent],
})
export class WebTaskItemFeatureModule {}

