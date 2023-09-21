
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebDurableMedicalEquipmentFeatureComponent } from './web-durable-medical-equipment-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-durable-medical-equipment-list/web-durable-medical-equipment-list.module').then((m) => m.WebDurableMedicalEquipmentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-durable-medical-equipment-create/web-durable-medical-equipment-create.module').then((m) => m.WebDurableMedicalEquipmentCreateModule),
      },
      {
        path: ':durableMedicalEquipmentId',
        component: WebDurableMedicalEquipmentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-durable-medical-equipment-detail/web-durable-medical-equipment-detail.module').then((m) => m.WebDurableMedicalEquipmentDetailModule),
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
  declarations: [WebDurableMedicalEquipmentFeatureComponent],
})
export class WebDurableMedicalEquipmentFeatureModule {}

