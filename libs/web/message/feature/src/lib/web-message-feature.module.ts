
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebMessageFeatureComponent } from './web-message-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-message-list/web-message-list.module').then((m) => m.WebMessageListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-message-create/web-message-create.module').then((m) => m.WebMessageCreateModule),
      },
      {
        path: ':messageId',
        component: WebMessageFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-message-detail/web-message-detail.module').then((m) => m.WebMessageDetailModule),
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
  declarations: [WebMessageFeatureComponent],
})
export class WebMessageFeatureModule {}

