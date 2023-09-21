


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AuthorizationDiagnosisCode } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-authorization-diagnosis-code-table-view',
  templateUrl: './web-authorization-diagnosis-code-table-view.component.html'
 })
export class WebAuthorizationDiagnosisCodeTableViewComponent
    {
  @Input() authorizationDiagnosisCodes: AuthorizationDiagnosisCode[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAuthorizationDiagnosisCode($event) {
      if($event) {
        this.authorizationDiagnosisCodes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      authorizationDiagnosisCode,
    }: { authorizationDiagnosisCode?: AuthorizationDiagnosisCode },
  ) {
    this.dialog.open(tpl, { data: { authorizationDiagnosisCode }, closeButton: false })
  }

}
