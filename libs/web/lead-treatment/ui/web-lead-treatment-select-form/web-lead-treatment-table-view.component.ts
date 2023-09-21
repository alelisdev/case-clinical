


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { LeadTreatment } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-lead-treatment-table-view',
  templateUrl: './web-lead-treatment-table-view.component.html'
 })
export class WebLeadTreatmentTableViewComponent
    {
  @Input() leadTreatments: LeadTreatment[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLeadTreatment($event) {
      if($event) {
        this.leadTreatments.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      leadTreatment,
    }: { leadTreatment?: LeadTreatment },
  ) {
    this.dialog.open(tpl, { data: { leadTreatment }, closeButton: false })
  }

}
