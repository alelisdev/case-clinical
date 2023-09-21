
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorAuthorizationImplantFeatureComponent } from './web-prior-authorization-implant-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-authorization-implant-list/web-prior-authorization-implant-list.module').then((m) => m.WebPriorAuthorizationImplantListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-authorization-implant-create/web-prior-authorization-implant-create.module').then((m) => m.WebPriorAuthorizationImplantCreateModule),
      },
      {
        path: ':priorAuthorizationImplantId',
        component: WebPriorAuthorizationImplantFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-authorization-implant-detail/web-prior-authorization-implant-detail.module').then((m) => m.WebPriorAuthorizationImplantDetailModule),
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
  declarations: [WebPriorAuthorizationImplantFeatureComponent],
})
export class WebPriorAuthorizationImplantFeatureModule {}

