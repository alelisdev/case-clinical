
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebLegalCaseFeatureComponent } from './web-legal-case-feature.component'
import { Ng7DynamicBreadcrumbModule } from '@case-clinical/web/ui/breadcrumbs'

@NgModule({
  imports: [
    Ng7DynamicBreadcrumbModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Legal Cases',
          // flags: ['LegalCase.View'],
          breadcrumb: [
            {
              name: 'Legal Cases',
              path: 'queues/legal-cases/:id/details/overview',
              formName: 'legalCase_overview_test_2'
            }
          ]
        },
        loadChildren: () => import('./web-legal-case-list/web-legal-case-list.module').then((m) => m.WebLegalCaseListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-legal-case-create/web-legal-case-create.module').then((m) => m.WebLegalCaseCreateModule),
      },
      {
        path: ':legalCaseId',
        component: WebLegalCaseFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-legal-case-detail/web-legal-case-detail.module').then((m) => m.WebLegalCaseDetailModule),
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
  declarations: [WebLegalCaseFeatureComponent],
})
export class WebLegalCaseFeatureModule {}

