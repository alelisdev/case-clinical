

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebJournalEntryTemplateFeatureStore } from '@case-clinical/web/journal-entry-template/shared'
import { WebJournalEntryTemplateSelectComponent } from './web-journal-entry-template-select.component'
import { WebJournalEntryTemplateSelectTableViewComponent } from './web-journal-entry-template-select-table-view.component'
import { WebFormsUiJournalEntryTemplateComponent } from './web-journal-entry-template-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebJournalEntryTemplateGridComponent } from './web-journal-entry-template-grid.component'

@NgModule({
  exports: [
        WebFormsUiJournalEntryTemplateComponent, 
        WebJournalEntryTemplateSelectTableViewComponent, 
        WebJournalEntryTemplateSelectComponent,
        WebJournalEntryTemplateGridComponent
    ],
  declarations: [
        WebFormsUiJournalEntryTemplateComponent, 
        WebJournalEntryTemplateSelectTableViewComponent, 
        WebJournalEntryTemplateSelectComponent,
        WebJournalEntryTemplateGridComponent
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
          name: 'journal-entry-template-select',
          component: WebJournalEntryTemplateSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'journal-entry-template-grid',
          component: WebJournalEntryTemplateGridComponent,
        }
      ],
    }),
  ],
  providers: [WebJournalEntryTemplateFeatureStore],
})
export class WebFormsUiJournalEntryTemplateSelectModule {}
