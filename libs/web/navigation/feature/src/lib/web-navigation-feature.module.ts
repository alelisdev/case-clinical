
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebNavigationFeatureComponent } from './web-navigation-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-navigation-list/web-navigation-list.module').then((m) => m.WebNavigationListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-navigation-create/web-navigation-create.module').then((m) => m.WebNavigationCreateModule),
      },
      {
        path: ':navigationId',
        component: WebNavigationFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-navigation-detail/web-navigation-detail.module').then((m) => m.WebNavigationDetailModule),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'details',
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebNavigationFeatureComponent],
})
export class WebNavigationFeatureModule {}

