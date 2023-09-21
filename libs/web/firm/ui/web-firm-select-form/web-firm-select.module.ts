

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebFirmFeatureStore } from '@case-clinical/web/firm/shared'
import { WebFirmSelectComponent } from './web-firm-select.component'
import { WebFirmSelectTableViewComponent } from './web-firm-select-table-view.component'
import { WebFormsUiFirmComponent } from './web-firm-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebFirmGridComponent } from './web-firm-grid.component'

@NgModule({
  exports: [
        WebFormsUiFirmComponent, 
        WebFirmSelectTableViewComponent, 
        WebFirmSelectComponent,
        WebFirmGridComponent
    ],
  declarations: [
        WebFormsUiFirmComponent, 
        WebFirmSelectTableViewComponent, 
        WebFirmSelectComponent,
        WebFirmGridComponent
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
          name: 'firm-select',
          component: WebFirmSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'firm-grid',
          component: WebFirmGridComponent,
        }
      ],
    }),
  ],
  providers: [WebFirmFeatureStore],
})
export class WebFormsUiFirmSelectModule {}
