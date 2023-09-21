


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Lead } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-lead-table-view',
  templateUrl: './web-lead-table-view.component.html'
 })
export class WebLeadTableViewComponent
    {
  @Input() leads: Lead[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLead($event) {
      if($event) {
        this.leads.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      lead,
    }: { lead?: Lead },
  ) {
    this.dialog.open(tpl, { data: { lead }, closeButton: false })
  }

}
