
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebSeverityFeatureComponent } from './web-severity-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-severity-list/web-severity-list.module').then((m) => m.WebSeverityListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-severity-create/web-severity-create.module').then((m) => m.WebSeverityCreateModule),
      },
      {
        path: ':severityId',
        component: WebSeverityFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-severity-detail/web-severity-detail.module').then((m) => m.WebSeverityDetailModule),
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
  declarations: [WebSeverityFeatureComponent],
})
export class WebSeverityFeatureModule {}

