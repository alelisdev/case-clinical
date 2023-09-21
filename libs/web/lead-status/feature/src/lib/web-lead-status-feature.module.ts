
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebLeadStatusFeatureComponent } from './web-lead-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-lead-status-list/web-lead-status-list.module').then((m) => m.WebLeadStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-lead-status-create/web-lead-status-create.module').then((m) => m.WebLeadStatusCreateModule),
      },
      {
        path: ':leadStatusId',
        component: WebLeadStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-lead-status-detail/web-lead-status-detail.module').then((m) => m.WebLeadStatusDetailModule),
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
  declarations: [WebLeadStatusFeatureComponent],
})
export class WebLeadStatusFeatureModule {}

