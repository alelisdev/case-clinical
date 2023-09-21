
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebFirmFeatureComponent } from './web-firm-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-firm-list/web-firm-list.module').then((m) => m.WebFirmListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-firm-create/web-firm-create.module').then((m) => m.WebFirmCreateModule),
      },
      {
        path: ':firmId',
        component: WebFirmFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-firm-detail/web-firm-detail.module').then((m) => m.WebFirmDetailModule),
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
  declarations: [WebFirmFeatureComponent],
})
export class WebFirmFeatureModule {}

