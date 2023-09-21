

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorAuthorizationEquipmentFeatureStore } from '@case-clinical/web/prior-authorization-equipment/shared'
import { WebPriorAuthorizationEquipmentSelectComponent } from './web-prior-authorization-equipment-select.component'
import { WebPriorAuthorizationEquipmentSelectTableViewComponent } from './web-prior-authorization-equipment-select-table-view.component'
import { WebFormsUiPriorAuthorizationEquipmentComponent } from './web-prior-authorization-equipment-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorAuthorizationEquipmentGridComponent } from './web-prior-authorization-equipment-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorAuthorizationEquipmentComponent, 
        WebPriorAuthorizationEquipmentSelectTableViewComponent, 
        WebPriorAuthorizationEquipmentSelectComponent,
        WebPriorAuthorizationEquipmentGridComponent
    ],
  declarations: [
        WebFormsUiPriorAuthorizationEquipmentComponent, 
        WebPriorAuthorizationEquipmentSelectTableViewComponent, 
        WebPriorAuthorizationEquipmentSelectComponent,
        WebPriorAuthorizationEquipmentGridComponent
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
          name: 'prior-authorization-equipment-select',
          component: WebPriorAuthorizationEquipmentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-authorization-equipment-grid',
          component: WebPriorAuthorizationEquipmentGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorAuthorizationEquipmentFeatureStore],
})
export class WebFormsUiPriorAuthorizationEquipmentSelectModule {}
