
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureSiteFeatureComponent } from './web-procedure-site-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-site-list/web-procedure-site-list.module').then((m) => m.WebProcedureSiteListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-site-create/web-procedure-site-create.module').then((m) => m.WebProcedureSiteCreateModule),
      },
      {
        path: ':procedureSiteId',
        component: WebProcedureSiteFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-site-detail/web-procedure-site-detail.module').then((m) => m.WebProcedureSiteDetailModule),
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
  declarations: [WebProcedureSiteFeatureComponent],
})
export class WebProcedureSiteFeatureModule {}

