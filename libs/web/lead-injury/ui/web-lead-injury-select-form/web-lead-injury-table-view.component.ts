


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { LeadInjury } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-lead-injury-table-view',
  templateUrl: './web-lead-injury-table-view.component.html'
 })
export class WebLeadInjuryTableViewComponent
    {
  @Input() leadInjuries: LeadInjury[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLeadInjury($event) {
      if($event) {
        this.leadInjuries.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      leadInjury,
    }: { leadInjury?: LeadInjury },
  ) {
    this.dialog.open(tpl, { data: { leadInjury }, closeButton: false })
  }

}
