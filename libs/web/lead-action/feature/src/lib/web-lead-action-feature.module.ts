
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebLeadActionFeatureComponent } from './web-lead-action-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-lead-action-list/web-lead-action-list.module').then((m) => m.WebLeadActionListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-lead-action-create/web-lead-action-create.module').then((m) => m.WebLeadActionCreateModule),
      },
      {
        path: ':leadActionId',
        component: WebLeadActionFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-lead-action-detail/web-lead-action-detail.module').then((m) => m.WebLeadActionDetailModule),
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
  declarations: [WebLeadActionFeatureComponent],
})
export class WebLeadActionFeatureModule {}

