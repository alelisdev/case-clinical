


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { LeadAction } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-lead-action-table-view',
  templateUrl: './web-lead-action-table-view.component.html'
 })
export class WebLeadActionTableViewComponent
    {
  @Input() leadActions: LeadAction[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLeadAction($event) {
      if($event) {
        this.leadActions.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      leadAction,
    }: { leadAction?: LeadAction },
  ) {
    this.dialog.open(tpl, { data: { leadAction }, closeButton: false })
  }

}
