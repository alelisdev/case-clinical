
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebLocationFeatureComponent } from './web-location-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-location-list/web-location-list.module').then((m) => m.WebLocationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-location-create/web-location-create.module').then((m) => m.WebLocationCreateModule),
      },
      {
        path: ':locationId',
        component: WebLocationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-location-detail/web-location-detail.module').then((m) => m.WebLocationDetailModule),
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
  declarations: [WebLocationFeatureComponent],
})
export class WebLocationFeatureModule {}

