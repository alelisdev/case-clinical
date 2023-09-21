
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebIntegrationFeatureComponent } from './web-integration-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-integration-list/web-integration-list.module').then((m) => m.WebIntegrationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-integration-create/web-integration-create.module').then((m) => m.WebIntegrationCreateModule),
      },
      {
        path: ':integrationId',
        component: WebIntegrationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-integration-detail/web-integration-detail.module').then((m) => m.WebIntegrationDetailModule),
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
  declarations: [WebIntegrationFeatureComponent],
})
export class WebIntegrationFeatureModule {}

