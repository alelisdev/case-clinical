
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebWriteOffFeatureComponent } from './web-write-off-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-write-off-list/web-write-off-list.module').then((m) => m.WebWriteOffListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-write-off-create/web-write-off-create.module').then((m) => m.WebWriteOffCreateModule),
      },
      {
        path: ':writeOffId',
        component: WebWriteOffFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-write-off-detail/web-write-off-detail.module').then((m) => m.WebWriteOffDetailModule),
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
  declarations: [WebWriteOffFeatureComponent],
})
export class WebWriteOffFeatureModule {}

