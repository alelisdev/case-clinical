
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebLeadFeatureComponent } from './web-lead-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-lead-list/web-lead-list.module').then((m) => m.WebLeadListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-lead-create/web-lead-create.module').then((m) => m.WebLeadCreateModule),
      },
      {
        path: ':leadId',
        component: WebLeadFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-lead-detail/web-lead-detail.module').then((m) => m.WebLeadDetailModule),
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
  declarations: [WebLeadFeatureComponent],
})
export class WebLeadFeatureModule {}

