


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { JournalEntry } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-journal-entry-table-view',
  templateUrl: './web-journal-entry-table-view.component.html'
 })
export class WebJournalEntryTableViewComponent
    {
  @Input() journalEntries: JournalEntry[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createJournalEntry($event) {
      if($event) {
        this.journalEntries.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      journalEntry,
    }: { journalEntry?: JournalEntry },
  ) {
    this.dialog.open(tpl, { data: { journalEntry }, closeButton: false })
  }

}
