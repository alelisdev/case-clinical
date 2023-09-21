
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebProcedureTypeFeatureComponent } from './web-procedure-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-procedure-type-list/web-procedure-type-list.module').then((m) => m.WebProcedureTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-procedure-type-create/web-procedure-type-create.module').then((m) => m.WebProcedureTypeCreateModule),
      },
      {
        path: ':procedureTypeId',
        component: WebProcedureTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-procedure-type-detail/web-procedure-type-detail.module').then((m) => m.WebProcedureTypeDetailModule),
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
  declarations: [WebProcedureTypeFeatureComponent],
})
export class WebProcedureTypeFeatureModule {}

