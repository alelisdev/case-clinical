

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebJournalEntryTemplateListComponent } from './web-journal-entry-template-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebJournalEntryTemplateListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebJournalEntryTemplateListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebJournalEntryTemplateListModule {}

