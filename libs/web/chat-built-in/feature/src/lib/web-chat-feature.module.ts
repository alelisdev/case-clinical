
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebChatFeatureComponent } from './web-chat-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-chat-list/web-chat-list.module').then((m) => m.WebChatListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-chat-create/web-chat-create.module').then((m) => m.WebChatCreateModule),
      },
      {
        path: ':chatId',
        component: WebChatFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-chat-detail/web-chat-detail.module').then((m) => m.WebChatDetailModule),
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
  declarations: [WebChatFeatureComponent],
})
export class WebChatFeatureModule {}

