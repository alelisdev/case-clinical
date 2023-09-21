

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebRequiredFieldFeatureStore } from '@case-clinical/web/required-field/shared'
import { WebRequiredFieldSelectComponent } from './web-required-field-select.component'
import { WebRequiredFieldSelectTableViewComponent } from './web-required-field-select-table-view.component'
import { WebFormsUiRequiredFieldComponent } from './web-required-field-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebRequiredFieldGridComponent } from './web-required-field-grid.component'

@NgModule({
  exports: [
        WebFormsUiRequiredFieldComponent, 
        WebRequiredFieldSelectTableViewComponent, 
        WebRequiredFieldSelectComponent,
        WebRequiredFieldGridComponent
    ],
  declarations: [
        WebFormsUiRequiredFieldComponent, 
        WebRequiredFieldSelectTableViewComponent, 
        WebRequiredFieldSelectComponent,
        WebRequiredFieldGridComponent
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
          name: 'required-field-select',
          component: WebRequiredFieldSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'required-field-grid',
          component: WebRequiredFieldGridComponent,
        }
      ],
    }),
  ],
  providers: [WebRequiredFieldFeatureStore],
})
export class WebFormsUiRequiredFieldSelectModule {}
