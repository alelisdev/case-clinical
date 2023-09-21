
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCasePreAccidentFeatureComponent } from './web-case-pre-accident-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-pre-accident-list/web-case-pre-accident-list.module').then((m) => m.WebCasePreAccidentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-pre-accident-create/web-case-pre-accident-create.module').then((m) => m.WebCasePreAccidentCreateModule),
      },
      {
        path: ':casePreAccidentId',
        component: WebCasePreAccidentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-pre-accident-detail/web-case-pre-accident-detail.module').then((m) => m.WebCasePreAccidentDetailModule),
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
  declarations: [WebCasePreAccidentFeatureComponent],
})
export class WebCasePreAccidentFeatureModule {}

