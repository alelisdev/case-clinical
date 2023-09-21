


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { LeadSource } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-lead-source-table-view',
  templateUrl: './web-lead-source-table-view.component.html'
 })
export class WebLeadSourceTableViewComponent
    {
  @Input() leadSources: LeadSource[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLeadSource($event) {
      if($event) {
        this.leadSources.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      leadSource,
    }: { leadSource?: LeadSource },
  ) {
    this.dialog.open(tpl, { data: { leadSource }, closeButton: false })
  }

}
