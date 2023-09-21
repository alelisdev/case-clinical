

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebInjuryFeatureStore } from '@case-clinical/web/injury/shared'
import { WebInjurySelectComponent } from './web-injury-select.component'
import { WebInjurySelectTableViewComponent } from './web-injury-select-table-view.component'
import { WebFormsUiInjuryComponent } from './web-injury-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebInjuryGridComponent } from './web-injury-grid.component'

@NgModule({
  exports: [
        WebFormsUiInjuryComponent, 
        WebInjurySelectTableViewComponent, 
        WebInjurySelectComponent,
        WebInjuryGridComponent
    ],
  declarations: [
        WebFormsUiInjuryComponent, 
        WebInjurySelectTableViewComponent, 
        WebInjurySelectComponent,
        WebInjuryGridComponent
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
          name: 'injury-select',
          component: WebInjurySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'injury-grid',
          component: WebInjuryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebInjuryFeatureStore],
})
export class WebFormsUiInjurySelectModule {}
