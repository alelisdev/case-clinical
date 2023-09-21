
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContactEmailFeatureComponent } from './web-contact-email-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contact-email-list/web-contact-email-list.module').then((m) => m.WebContactEmailListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contact-email-create/web-contact-email-create.module').then((m) => m.WebContactEmailCreateModule),
      },
      {
        path: ':contactEmailId',
        component: WebContactEmailFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contact-email-detail/web-contact-email-detail.module').then((m) => m.WebContactEmailDetailModule),
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
  declarations: [WebContactEmailFeatureComponent],
})
export class WebContactEmailFeatureModule {}

