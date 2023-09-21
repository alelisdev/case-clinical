
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPlaceOfServiceFeatureComponent } from './web-place-of-service-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-place-of-service-list/web-place-of-service-list.module').then((m) => m.WebPlaceOfServiceListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-place-of-service-create/web-place-of-service-create.module').then((m) => m.WebPlaceOfServiceCreateModule),
      },
      {
        path: ':placeOfServiceId',
        component: WebPlaceOfServiceFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-place-of-service-detail/web-place-of-service-detail.module').then((m) => m.WebPlaceOfServiceDetailModule),
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
  declarations: [WebPlaceOfServiceFeatureComponent],
})
export class WebPlaceOfServiceFeatureModule {}

