


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ProcedureOrTreatmentRequest } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-or-treatment-request-table-view',
  templateUrl: './web-procedure-or-treatment-request-table-view.component.html'
 })
export class WebProcedureOrTreatmentRequestTableViewComponent
    {
  @Input() procedureOrTreatmentRequests: ProcedureOrTreatmentRequest[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedureOrTreatmentRequest($event) {
      if($event) {
        this.procedureOrTreatmentRequests.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedureOrTreatmentRequest,
    }: { procedureOrTreatmentRequest?: ProcedureOrTreatmentRequest },
  ) {
    this.dialog.open(tpl, { data: { procedureOrTreatmentRequest }, closeButton: false })
  }

}
