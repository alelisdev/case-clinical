
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCasePreInjuryFeatureComponent } from './web-case-pre-injury-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-case-pre-injury-list/web-case-pre-injury-list.module').then((m) => m.WebCasePreInjuryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-case-pre-injury-create/web-case-pre-injury-create.module').then((m) => m.WebCasePreInjuryCreateModule),
      },
      {
        path: ':casePreInjuryId',
        component: WebCasePreInjuryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-case-pre-injury-detail/web-case-pre-injury-detail.module').then((m) => m.WebCasePreInjuryDetailModule),
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
  declarations: [WebCasePreInjuryFeatureComponent],
})
export class WebCasePreInjuryFeatureModule {}

