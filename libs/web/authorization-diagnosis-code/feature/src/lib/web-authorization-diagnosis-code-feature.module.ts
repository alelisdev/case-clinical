
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAuthorizationDiagnosisCodeFeatureComponent } from './web-authorization-diagnosis-code-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-authorization-diagnosis-code-list/web-authorization-diagnosis-code-list.module').then((m) => m.WebAuthorizationDiagnosisCodeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-authorization-diagnosis-code-create/web-authorization-diagnosis-code-create.module').then((m) => m.WebAuthorizationDiagnosisCodeCreateModule),
      },
      {
        path: ':authorizationDiagnosisCodeId',
        component: WebAuthorizationDiagnosisCodeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-authorization-diagnosis-code-detail/web-authorization-diagnosis-code-detail.module').then((m) => m.WebAuthorizationDiagnosisCodeDetailModule),
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
  declarations: [WebAuthorizationDiagnosisCodeFeatureComponent],
})
export class WebAuthorizationDiagnosisCodeFeatureModule {}

