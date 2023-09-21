

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDurableMedicalEquipmentListComponent } from './web-durable-medical-equipment-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebDurableMedicalEquipmentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebDurableMedicalEquipmentListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebDurableMedicalEquipmentListModule {}

