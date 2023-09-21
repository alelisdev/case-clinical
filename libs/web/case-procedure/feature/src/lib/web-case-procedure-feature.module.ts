
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCaseProcedureFeatureComponent } from './web-case-procedure-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-procedure-list/web-case-procedure-list.module').then((m) => m.WebCaseProcedureListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-procedure-create/web-case-procedure-create.module').then((m) => m.WebCaseProcedureCreateModule),
      },
      {
        path: ':caseProcedureId',
        component: WebCaseProcedureFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-procedure-detail/web-case-procedure-detail.module').then((m) => m.WebCaseProcedureDetailModule),
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
  declarations: [WebCaseProcedureFeatureComponent],
})
export class WebCaseProcedureFeatureModule {}

