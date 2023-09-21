
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebWriteOffStatusFeatureComponent } from './web-write-off-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-write-off-status-list/web-write-off-status-list.module').then((m) => m.WebWriteOffStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-write-off-status-create/web-write-off-status-create.module').then((m) => m.WebWriteOffStatusCreateModule),
      },
      {
        path: ':writeOffStatusId',
        component: WebWriteOffStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-write-off-status-detail/web-write-off-status-detail.module').then((m) => m.WebWriteOffStatusDetailModule),
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
  declarations: [WebWriteOffStatusFeatureComponent],
})
export class WebWriteOffStatusFeatureModule {}

