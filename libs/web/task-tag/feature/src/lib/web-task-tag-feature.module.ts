
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebTaskTagFeatureComponent } from './web-task-tag-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-task-tag-list/web-task-tag-list.module').then((m) => m.WebTaskTagListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-task-tag-create/web-task-tag-create.module').then((m) => m.WebTaskTagCreateModule),
      },
      {
        path: ':taskTagId',
        component: WebTaskTagFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-task-tag-detail/web-task-tag-detail.module').then((m) => m.WebTaskTagDetailModule),
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
  declarations: [WebTaskTagFeatureComponent],
})
export class WebTaskTagFeatureModule {}

