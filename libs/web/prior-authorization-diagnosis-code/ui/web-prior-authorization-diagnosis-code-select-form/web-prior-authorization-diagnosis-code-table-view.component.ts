


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorAuthorizationDiagnosisCode } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-authorization-diagnosis-code-table-view',
  templateUrl: './web-prior-authorization-diagnosis-code-table-view.component.html'
 })
export class WebPriorAuthorizationDiagnosisCodeTableViewComponent
    {
  @Input() priorAuthorizationDiagnosisCodes: PriorAuthorizationDiagnosisCode[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorAuthorizationDiagnosisCode($event) {
      if($event) {
        this.priorAuthorizationDiagnosisCodes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorAuthorizationDiagnosisCode,
    }: { priorAuthorizationDiagnosisCode?: PriorAuthorizationDiagnosisCode },
  ) {
    this.dialog.open(tpl, { data: { priorAuthorizationDiagnosisCode }, closeButton: false })
  }

}
