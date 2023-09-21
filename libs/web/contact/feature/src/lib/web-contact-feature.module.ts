
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContactFeatureComponent } from './web-contact-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contact-list/web-contact-list.module').then((m) => m.WebContactListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contact-create/web-contact-create.module').then((m) => m.WebContactCreateModule),
      },
      {
        path: ':contactId',
        component: WebContactFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contact-detail/web-contact-detail.module').then((m) => m.WebContactDetailModule),
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
  declarations: [WebContactFeatureComponent],
})
export class WebContactFeatureModule {}

