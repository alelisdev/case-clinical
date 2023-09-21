
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebDiagnosisCodeFeatureComponent } from './web-diagnosis-code-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-diagnosis-code-list/web-diagnosis-code-list.module').then((m) => m.WebDiagnosisCodeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-diagnosis-code-create/web-diagnosis-code-create.module').then((m) => m.WebDiagnosisCodeCreateModule),
      },
      {
        path: ':diagnosisCodeId',
        component: WebDiagnosisCodeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-diagnosis-code-detail/web-diagnosis-code-detail.module').then((m) => m.WebDiagnosisCodeDetailModule),
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
  declarations: [WebDiagnosisCodeFeatureComponent],
})
export class WebDiagnosisCodeFeatureModule {}

