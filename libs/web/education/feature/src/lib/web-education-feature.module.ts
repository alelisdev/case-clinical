
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebEducationFeatureComponent } from './web-education-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-education-list/web-education-list.module').then((m) => m.WebEducationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-education-create/web-education-create.module').then((m) => m.WebEducationCreateModule),
      },
      {
        path: ':educationId',
        component: WebEducationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-education-detail/web-education-detail.module').then((m) => m.WebEducationDetailModule),
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
  declarations: [WebEducationFeatureComponent],
})
export class WebEducationFeatureModule {}

