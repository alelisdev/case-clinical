
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebSurgicalPositionFeatureComponent } from './web-surgical-position-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-surgical-position-list/web-surgical-position-list.module').then((m) => m.WebSurgicalPositionListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-surgical-position-create/web-surgical-position-create.module').then((m) => m.WebSurgicalPositionCreateModule),
      },
      {
        path: ':surgicalPositionId',
        component: WebSurgicalPositionFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-surgical-position-detail/web-surgical-position-detail.module').then((m) => m.WebSurgicalPositionDetailModule),
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
  declarations: [WebSurgicalPositionFeatureComponent],
})
export class WebSurgicalPositionFeatureModule {}

