

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebManufacturerFeatureStore } from '@case-clinical/web/manufacturer/shared'
import { WebManufacturerSelectComponent } from './web-manufacturer-select.component'
import { WebManufacturerSelectTableViewComponent } from './web-manufacturer-select-table-view.component'
import { WebFormsUiManufacturerComponent } from './web-manufacturer-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebManufacturerGridComponent } from './web-manufacturer-grid.component'

@NgModule({
  exports: [
        WebFormsUiManufacturerComponent, 
        WebManufacturerSelectTableViewComponent, 
        WebManufacturerSelectComponent,
        WebManufacturerGridComponent
    ],
  declarations: [
        WebFormsUiManufacturerComponent, 
        WebManufacturerSelectTableViewComponent, 
        WebManufacturerSelectComponent,
        WebManufacturerGridComponent
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
          name: 'manufacturer-select',
          component: WebManufacturerSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'manufacturer-grid',
          component: WebManufacturerGridComponent,
        }
      ],
    }),
  ],
  providers: [WebManufacturerFeatureStore],
})
export class WebFormsUiManufacturerSelectModule {}
