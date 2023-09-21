


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { LeadStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-lead-status-table-view',
  templateUrl: './web-lead-status-table-view.component.html'
 })
export class WebLeadStatusTableViewComponent
    {
  @Input() leadStatuses: LeadStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLeadStatus($event) {
      if($event) {
        this.leadStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      leadStatus,
    }: { leadStatus?: LeadStatus },
  ) {
    this.dialog.open(tpl, { data: { leadStatus }, closeButton: false })
  }

}
