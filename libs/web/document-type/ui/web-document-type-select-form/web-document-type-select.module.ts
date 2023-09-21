

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebDocumentTypeFeatureStore } from '@case-clinical/web/document-type/shared'
import { WebDocumentTypeSelectComponent } from './web-document-type-select.component'
import { WebDocumentTypeSelectTableViewComponent } from './web-document-type-select-table-view.component'
import { WebFormsUiDocumentTypeComponent } from './web-document-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebDocumentTypeGridComponent } from './web-document-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiDocumentTypeComponent, 
        WebDocumentTypeSelectTableViewComponent, 
        WebDocumentTypeSelectComponent,
        WebDocumentTypeGridComponent
    ],
  declarations: [
        WebFormsUiDocumentTypeComponent, 
        WebDocumentTypeSelectTableViewComponent, 
        WebDocumentTypeSelectComponent,
        WebDocumentTypeGridComponent
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
          name: 'document-type-select',
          component: WebDocumentTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'document-type-grid',
          component: WebDocumentTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebDocumentTypeFeatureStore],
})
export class WebFormsUiDocumentTypeSelectModule {}
