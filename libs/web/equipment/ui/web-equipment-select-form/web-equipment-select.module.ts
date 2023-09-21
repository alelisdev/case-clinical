

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebEquipmentFeatureStore } from '@case-clinical/web/equipment/shared'
import { WebEquipmentSelectComponent } from './web-equipment-select.component'
import { WebEquipmentSelectTableViewComponent } from './web-equipment-select-table-view.component'
import { WebFormsUiEquipmentComponent } from './web-equipment-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebEquipmentGridComponent } from './web-equipment-grid.component'

@NgModule({
  exports: [
        WebFormsUiEquipmentComponent, 
        WebEquipmentSelectTableViewComponent, 
        WebEquipmentSelectComponent,
        WebEquipmentGridComponent
    ],
  declarations: [
        WebFormsUiEquipmentComponent, 
        WebEquipmentSelectTableViewComponent, 
        WebEquipmentSelectComponent,
        WebEquipmentGridComponent
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
          name: 'equipment-select',
          component: WebEquipmentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'equipment-grid',
          component: WebEquipmentGridComponent,
        }
      ],
    }),
  ],
  providers: [WebEquipmentFeatureStore],
})
export class WebFormsUiEquipmentSelectModule {}
