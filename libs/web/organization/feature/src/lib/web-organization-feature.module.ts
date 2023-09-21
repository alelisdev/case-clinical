
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebOrganizationFeatureComponent } from './web-organization-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-organization-list/web-organization-list.module').then((m) => m.WebOrganizationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-organization-create/web-organization-create.module').then((m) => m.WebOrganizationCreateModule),
      },
      {
        path: ':organizationId',
        component: WebOrganizationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-organization-detail/web-organization-detail.module').then((m) => m.WebOrganizationDetailModule),
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
  declarations: [WebOrganizationFeatureComponent],
})
export class WebOrganizationFeatureModule {}

