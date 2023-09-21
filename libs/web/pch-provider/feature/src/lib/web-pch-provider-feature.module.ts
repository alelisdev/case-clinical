
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPchProviderFeatureComponent } from './web-pch-provider-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-pch-provider-list/web-pch-provider-list.module').then((m) => m.WebPchProviderListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-pch-provider-create/web-pch-provider-create.module').then((m) => m.WebPchProviderCreateModule),
      },
      {
        path: ':pchProviderId',
        component: WebPchProviderFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-pch-provider-detail/web-pch-provider-detail.module').then((m) => m.WebPchProviderDetailModule),
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
  declarations: [WebPchProviderFeatureComponent],
})
export class WebPchProviderFeatureModule {}

