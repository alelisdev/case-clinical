


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ProcedureOrTreatmentRequestAuthorization } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-or-treatment-request-authorization-table-view',
  templateUrl: './web-procedure-or-treatment-request-authorization-table-view.component.html'
 })
export class WebProcedureOrTreatmentRequestAuthorizationTableViewComponent
    {
  @Input() procedureOrTreatmentRequestAuthorizations: ProcedureOrTreatmentRequestAuthorization[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedureOrTreatmentRequestAuthorization($event) {
      if($event) {
        this.procedureOrTreatmentRequestAuthorizations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedureOrTreatmentRequestAuthorization,
    }: { procedureOrTreatmentRequestAuthorization?: ProcedureOrTreatmentRequestAuthorization },
  ) {
    this.dialog.open(tpl, { data: { procedureOrTreatmentRequestAuthorization }, closeButton: false })
  }

}
