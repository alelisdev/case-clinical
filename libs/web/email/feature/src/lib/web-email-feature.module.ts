
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebEmailFeatureComponent } from './web-email-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-email-list/web-email-list.module').then((m) => m.WebEmailListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-email-create/web-email-create.module').then((m) => m.WebEmailCreateModule),
      },
      {
        path: ':emailId',
        component: WebEmailFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-email-detail/web-email-detail.module').then((m) => m.WebEmailDetailModule),
          },
          {
            path: '',
            redirectTo: 'details',
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebEmailFeatureComponent],
})
export class WebEmailFeatureModule {}

