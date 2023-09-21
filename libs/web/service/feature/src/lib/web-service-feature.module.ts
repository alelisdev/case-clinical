
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebServiceFeatureComponent } from './web-service-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-service-list/web-service-list.module').then((m) => m.WebServiceListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-service-create/web-service-create.module').then((m) => m.WebServiceCreateModule),
      },
      {
        path: ':serviceId',
        component: WebServiceFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-service-detail/web-service-detail.module').then((m) => m.WebServiceDetailModule),
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
  declarations: [WebServiceFeatureComponent],
})
export class WebServiceFeatureModule {}

