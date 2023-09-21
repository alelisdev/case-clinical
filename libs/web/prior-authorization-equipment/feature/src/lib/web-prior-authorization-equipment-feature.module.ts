
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorAuthorizationEquipmentFeatureComponent } from './web-prior-authorization-equipment-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-authorization-equipment-list/web-prior-authorization-equipment-list.module').then((m) => m.WebPriorAuthorizationEquipmentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-authorization-equipment-create/web-prior-authorization-equipment-create.module').then((m) => m.WebPriorAuthorizationEquipmentCreateModule),
      },
      {
        path: ':priorAuthorizationEquipmentId',
        component: WebPriorAuthorizationEquipmentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-authorization-equipment-detail/web-prior-authorization-equipment-detail.module').then((m) => m.WebPriorAuthorizationEquipmentDetailModule),
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
  declarations: [WebPriorAuthorizationEquipmentFeatureComponent],
})
export class WebPriorAuthorizationEquipmentFeatureModule {}

