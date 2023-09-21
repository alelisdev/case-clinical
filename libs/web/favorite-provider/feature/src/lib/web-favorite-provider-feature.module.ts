
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebFavoriteProviderFeatureComponent } from './web-favorite-provider-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-favorite-provider-list/web-favorite-provider-list.module').then((m) => m.WebFavoriteProviderListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-favorite-provider-create/web-favorite-provider-create.module').then((m) => m.WebFavoriteProviderCreateModule),
      },
      {
        path: ':favoriteProviderId',
        component: WebFavoriteProviderFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-favorite-provider-detail/web-favorite-provider-detail.module').then((m) => m.WebFavoriteProviderDetailModule),
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
  declarations: [WebFavoriteProviderFeatureComponent],
})
export class WebFavoriteProviderFeatureModule {}

