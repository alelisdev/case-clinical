

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared'
import { WebPrescriptionSelectComponent } from './web-prescription-select.component'
import { WebPrescriptionSelectTableViewComponent } from './web-prescription-select-table-view.component'
import { WebFormsUiPrescriptionComponent } from './web-prescription-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPrescriptionGridComponent } from './web-prescription-grid.component'

@NgModule({
  exports: [
        WebFormsUiPrescriptionComponent, 
        WebPrescriptionSelectTableViewComponent, 
        WebPrescriptionSelectComponent,
        WebPrescriptionGridComponent
    ],
  declarations: [
        WebFormsUiPrescriptionComponent, 
        WebPrescriptionSelectTableViewComponent, 
        WebPrescriptionSelectComponent,
        WebPrescriptionGridComponent
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
          name: 'prescription-select',
          component: WebPrescriptionSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prescription-grid',
          component: WebPrescriptionGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPrescriptionFeatureStore],
})
export class WebFormsUiPrescriptionSelectModule {}
