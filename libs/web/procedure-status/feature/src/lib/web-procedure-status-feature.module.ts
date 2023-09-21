
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureStatusFeatureComponent } from './web-procedure-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-status-list/web-procedure-status-list.module').then((m) => m.WebProcedureStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-status-create/web-procedure-status-create.module').then((m) => m.WebProcedureStatusCreateModule),
      },
      {
        path: ':procedureStatusId',
        component: WebProcedureStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-status-detail/web-procedure-status-detail.module').then((m) => m.WebProcedureStatusDetailModule),
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
  declarations: [WebProcedureStatusFeatureComponent],
})
export class WebProcedureStatusFeatureModule {}

