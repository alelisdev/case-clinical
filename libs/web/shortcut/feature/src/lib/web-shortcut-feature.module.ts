
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebShortcutFeatureComponent } from './web-shortcut-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-shortcut-list/web-shortcut-list.module').then((m) => m.WebShortcutListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-shortcut-create/web-shortcut-create.module').then((m) => m.WebShortcutCreateModule),
      },
      {
        path: ':shortcutId',
        component: WebShortcutFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-shortcut-detail/web-shortcut-detail.module').then((m) => m.WebShortcutDetailModule),
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
  declarations: [WebShortcutFeatureComponent],
})
export class WebShortcutFeatureModule {}

