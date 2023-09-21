

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebDocumentSelectFormStore } from './web-document-select-form.store'
import { WebDocumentSelectComponent } from './web-document-select.component'
import { WebDocumentSelectTableViewComponent } from './web-document-select-table-view.component'
import { WebFormsUiDocumentComponent } from './web-document-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebDocumentGridComponent } from './web-document-grid.component'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebDocumentFeatureStore } from '../../shared'
@NgModule({
  exports: [WebFormsUiDocumentComponent, WebDocumentSelectTableViewComponent, WebDocumentSelectTableViewComponent, WebDocumentSelectComponent, WebDocumentGridComponent],
  declarations: [WebDocumentGridComponent,WebFormsUiDocumentComponent, WebDocumentSelectTableViewComponent, WebDocumentSelectTableViewComponent, WebDocumentSelectComponent],
  imports: [
    CommonModule,
    FormlySelectModule,
    ReactiveFormsModule,
    WebCoreFeatureModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiSelectFormModule,
    WebUiFormlyDesignerModule,
    WebUiGridModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'document-select',
          component: WebDocumentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'document-grid',
          component: WebDocumentGridComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ],
  providers: [WebDocumentSelectFormStore, WebDocumentFeatureStore],
})
export class WebFormsUiDocumentSelectModule {}
