

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebDurableMedicalEquipmentFeatureStore } from '@case-clinical/web/durable-medical-equipment/shared'
import { WebDurableMedicalEquipmentSelectComponent } from './web-durable-medical-equipment-select.component'
import { WebDurableMedicalEquipmentSelectTableViewComponent } from './web-durable-medical-equipment-select-table-view.component'
import { WebFormsUiDurableMedicalEquipmentComponent } from './web-durable-medical-equipment-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebDurableMedicalEquipmentGridComponent } from './web-durable-medical-equipment-grid.component'

@NgModule({
  exports: [
        WebFormsUiDurableMedicalEquipmentComponent, 
        WebDurableMedicalEquipmentSelectTableViewComponent, 
        WebDurableMedicalEquipmentSelectComponent,
        WebDurableMedicalEquipmentGridComponent
    ],
  declarations: [
        WebFormsUiDurableMedicalEquipmentComponent, 
        WebDurableMedicalEquipmentSelectTableViewComponent, 
        WebDurableMedicalEquipmentSelectComponent,
        WebDurableMedicalEquipmentGridComponent
    ],
  imports: [
    CommonModule,
    FormlySelectModule,
    ReactiveFormsModule,
    WebCoreFeatureModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiGridModule,
    WebUiSelectFormModule,
    WebUiFormlyDesignerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'durable-medical-equipment-select',
          component: WebDurableMedicalEquipmentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'durable-medical-equipment-grid',
          component: WebDurableMedicalEquipmentGridComponent,
        }
      ],
    }),
  ],
  providers: [WebDurableMedicalEquipmentFeatureStore],
})
export class WebFormsUiDurableMedicalEquipmentSelectModule {}
