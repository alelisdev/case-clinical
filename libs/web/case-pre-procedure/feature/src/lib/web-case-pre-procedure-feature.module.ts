
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCasePreProcedureFeatureComponent } from './web-case-pre-procedure-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-pre-procedure-list/web-case-pre-procedure-list.module').then((m) => m.WebCasePreProcedureListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-pre-procedure-create/web-case-pre-procedure-create.module').then((m) => m.WebCasePreProcedureCreateModule),
      },
      {
        path: ':casePreProcedureId',
        component: WebCasePreProcedureFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-pre-procedure-detail/web-case-pre-procedure-detail.module').then((m) => m.WebCasePreProcedureDetailModule),
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
  declarations: [WebCasePreProcedureFeatureComponent],
})
export class WebCasePreProcedureFeatureModule {}

