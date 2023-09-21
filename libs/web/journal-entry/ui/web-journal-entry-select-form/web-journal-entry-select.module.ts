

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebJournalEntryFeatureStore } from '@case-clinical/web/journal-entry/shared'
import { WebJournalEntrySelectComponent } from './web-journal-entry-select.component'
import { WebJournalEntrySelectTableViewComponent } from './web-journal-entry-select-table-view.component'
import { WebFormsUiJournalEntryComponent } from './web-journal-entry-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebJournalEntryGridComponent } from './web-journal-entry-grid.component'

@NgModule({
  exports: [
        WebFormsUiJournalEntryComponent, 
        WebJournalEntrySelectTableViewComponent, 
        WebJournalEntrySelectComponent,
        WebJournalEntryGridComponent
    ],
  declarations: [
        WebFormsUiJournalEntryComponent, 
        WebJournalEntrySelectTableViewComponent, 
        WebJournalEntrySelectComponent,
        WebJournalEntryGridComponent
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
          name: 'journal-entry-select',
          component: WebJournalEntrySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'journal-entry-grid',
          component: WebJournalEntryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebJournalEntryFeatureStore],
})
export class WebFormsUiJournalEntrySelectModule {}
