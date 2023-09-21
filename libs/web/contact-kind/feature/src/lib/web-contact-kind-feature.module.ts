
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContactKindFeatureComponent } from './web-contact-kind-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contact-kind-list/web-contact-kind-list.module').then((m) => m.WebContactKindListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contact-kind-create/web-contact-kind-create.module').then((m) => m.WebContactKindCreateModule),
      },
      {
        path: ':contactKindId',
        component: WebContactKindFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contact-kind-detail/web-contact-kind-detail.module').then((m) => m.WebContactKindDetailModule),
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
  declarations: [WebContactKindFeatureComponent],
})
export class WebContactKindFeatureModule {}

