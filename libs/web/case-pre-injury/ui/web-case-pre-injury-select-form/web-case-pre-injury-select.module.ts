

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCasePreInjuryFeatureStore } from '@case-clinical/web/case-pre-injury/shared'
import { WebCasePreInjurySelectComponent } from './web-case-pre-injury-select.component'
import { WebCasePreInjurySelectTableViewComponent } from './web-case-pre-injury-select-table-view.component'
import { WebFormsUiCasePreInjuryComponent } from './web-case-pre-injury-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCasePreInjuryGridComponent } from './web-case-pre-injury-grid.component'

@NgModule({
  exports: [
        WebFormsUiCasePreInjuryComponent, 
        WebCasePreInjurySelectTableViewComponent, 
        WebCasePreInjurySelectComponent,
        WebCasePreInjuryGridComponent
    ],
  declarations: [
        WebFormsUiCasePreInjuryComponent, 
        WebCasePreInjurySelectTableViewComponent, 
        WebCasePreInjurySelectComponent,
        WebCasePreInjuryGridComponent
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
          name: 'case-pre-injury-select',
          component: WebCasePreInjurySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-pre-injury-grid',
          component: WebCasePreInjuryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCasePreInjuryFeatureStore],
})
export class WebFormsUiCasePreInjurySelectModule {}
