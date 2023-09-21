


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ProcedureOrTreatmentRequestDiagnosisCode } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-or-treatment-request-diagnosis-code-table-view',
  templateUrl: './web-procedure-or-treatment-request-diagnosis-code-table-view.component.html'
 })
export class WebProcedureOrTreatmentRequestDiagnosisCodeTableViewComponent
    {
  @Input() procedureOrTreatmentRequestDiagnosisCodes: ProcedureOrTreatmentRequestDiagnosisCode[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedureOrTreatmentRequestDiagnosisCode($event) {
      if($event) {
        this.procedureOrTreatmentRequestDiagnosisCodes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedureOrTreatmentRequestDiagnosisCode,
    }: { procedureOrTreatmentRequestDiagnosisCode?: ProcedureOrTreatmentRequestDiagnosisCode },
  ) {
    this.dialog.open(tpl, { data: { procedureOrTreatmentRequestDiagnosisCode }, closeButton: false })
  }

}
