
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcessFeatureComponent } from './web-process-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-process-list/web-process-list.module').then((m) => m.WebProcessListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-process-create/web-process-create.module').then((m) => m.WebProcessCreateModule),
      },
      {
        path: ':processId',
        component: WebProcessFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-process-detail/web-process-detail.module').then((m) => m.WebProcessDetailModule),
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
  declarations: [WebProcessFeatureComponent],
})
export class WebProcessFeatureModule {}

