
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorAuthorizationDiagnosisCodeFeatureComponent } from './web-prior-authorization-diagnosis-code-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-authorization-diagnosis-code-list/web-prior-authorization-diagnosis-code-list.module').then((m) => m.WebPriorAuthorizationDiagnosisCodeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-authorization-diagnosis-code-create/web-prior-authorization-diagnosis-code-create.module').then((m) => m.WebPriorAuthorizationDiagnosisCodeCreateModule),
      },
      {
        path: ':priorAuthorizationDiagnosisCodeId',
        component: WebPriorAuthorizationDiagnosisCodeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-authorization-diagnosis-code-detail/web-prior-authorization-diagnosis-code-detail.module').then((m) => m.WebPriorAuthorizationDiagnosisCodeDetailModule),
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
  declarations: [WebPriorAuthorizationDiagnosisCodeFeatureComponent],
})
export class WebPriorAuthorizationDiagnosisCodeFeatureModule {}

