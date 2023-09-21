
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureFeatureComponent } from './web-procedure-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-list/web-procedure-list.module').then((m) => m.WebProcedureListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-create/web-procedure-create.module').then((m) => m.WebProcedureCreateModule),
      },
      {
        path: ':procedureId',
        component: WebProcedureFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-detail/web-procedure-detail.module').then((m) => m.WebProcedureDetailModule),
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
  declarations: [WebProcedureFeatureComponent],
})
export class WebProcedureFeatureModule {}

