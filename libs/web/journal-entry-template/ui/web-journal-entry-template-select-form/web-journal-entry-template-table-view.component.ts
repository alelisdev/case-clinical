


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { JournalEntryTemplate } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-journal-entry-template-table-view',
  templateUrl: './web-journal-entry-template-table-view.component.html'
 })
export class WebJournalEntryTemplateTableViewComponent
    {
  @Input() journalEntryTemplates: JournalEntryTemplate[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createJournalEntryTemplate($event) {
      if($event) {
        this.journalEntryTemplates.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      journalEntryTemplate,
    }: { journalEntryTemplate?: JournalEntryTemplate },
  ) {
    this.dialog.open(tpl, { data: { journalEntryTemplate }, closeButton: false })
  }

}
