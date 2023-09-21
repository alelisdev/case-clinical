
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebClaimProcedureFeatureComponent } from './web-claim-procedure-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-claim-procedure-list/web-claim-procedure-list.module').then((m) => m.WebClaimProcedureListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-claim-procedure-create/web-claim-procedure-create.module').then((m) => m.WebClaimProcedureCreateModule),
      },
      {
        path: ':claimProcedureId',
        component: WebClaimProcedureFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-claim-procedure-detail/web-claim-procedure-detail.module').then((m) => m.WebClaimProcedureDetailModule),
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
  declarations: [WebClaimProcedureFeatureComponent],
})
export class WebClaimProcedureFeatureModule {}

