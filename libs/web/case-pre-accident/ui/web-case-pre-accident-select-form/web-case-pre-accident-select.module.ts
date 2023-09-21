

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCasePreAccidentFeatureStore } from '@case-clinical/web/case-pre-accident/shared'
import { WebCasePreAccidentSelectComponent } from './web-case-pre-accident-select.component'
import { WebCasePreAccidentSelectTableViewComponent } from './web-case-pre-accident-select-table-view.component'
import { WebFormsUiCasePreAccidentComponent } from './web-case-pre-accident-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCasePreAccidentGridComponent } from './web-case-pre-accident-grid.component'

@NgModule({
  exports: [
        WebFormsUiCasePreAccidentComponent, 
        WebCasePreAccidentSelectTableViewComponent, 
        WebCasePreAccidentSelectComponent,
        WebCasePreAccidentGridComponent
    ],
  declarations: [
        WebFormsUiCasePreAccidentComponent, 
        WebCasePreAccidentSelectTableViewComponent, 
        WebCasePreAccidentSelectComponent,
        WebCasePreAccidentGridComponent
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
          name: 'case-pre-accident-select',
          component: WebCasePreAccidentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-pre-accident-grid',
          component: WebCasePreAccidentGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCasePreAccidentFeatureStore],
})
export class WebFormsUiCasePreAccidentSelectModule {}
