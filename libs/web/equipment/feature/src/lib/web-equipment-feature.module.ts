
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebEquipmentFeatureComponent } from './web-equipment-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-equipment-list/web-equipment-list.module').then((m) => m.WebEquipmentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-equipment-create/web-equipment-create.module').then((m) => m.WebEquipmentCreateModule),
      },
      {
        path: ':equipmentId',
        component: WebEquipmentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-equipment-detail/web-equipment-detail.module').then((m) => m.WebEquipmentDetailModule),
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
  declarations: [WebEquipmentFeatureComponent],
})
export class WebEquipmentFeatureModule {}

