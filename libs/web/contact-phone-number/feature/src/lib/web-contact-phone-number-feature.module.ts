
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContactPhoneNumberFeatureComponent } from './web-contact-phone-number-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contact-phone-number-list/web-contact-phone-number-list.module').then((m) => m.WebContactPhoneNumberListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contact-phone-number-create/web-contact-phone-number-create.module').then((m) => m.WebContactPhoneNumberCreateModule),
      },
      {
        path: ':contactPhoneNumberId',
        component: WebContactPhoneNumberFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contact-phone-number-detail/web-contact-phone-number-detail.module').then((m) => m.WebContactPhoneNumberDetailModule),
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
  declarations: [WebContactPhoneNumberFeatureComponent],
})
export class WebContactPhoneNumberFeatureModule {}

