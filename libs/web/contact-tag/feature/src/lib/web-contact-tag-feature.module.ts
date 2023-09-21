
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebContactTagFeatureComponent } from './web-contact-tag-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contact-tag-list/web-contact-tag-list.module').then((m) => m.WebContactTagListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contact-tag-create/web-contact-tag-create.module').then((m) => m.WebContactTagCreateModule),
      },
      {
        path: ':contactTagId',
        component: WebContactTagFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contact-tag-detail/web-contact-tag-detail.module').then((m) => m.WebContactTagDetailModule),
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
  declarations: [WebContactTagFeatureComponent],
})
export class WebContactTagFeatureModule {}

