


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DiagnosisCode } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-diagnosis-code-table-view',
  templateUrl: './web-diagnosis-code-table-view.component.html'
 })
export class WebDiagnosisCodeTableViewComponent
    {
  @Input() diagnosisCodes: DiagnosisCode[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createDiagnosisCode($event) {
      if($event) {
        this.diagnosisCodes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      diagnosisCode,
    }: { diagnosisCode?: DiagnosisCode },
  ) {
    this.dialog.open(tpl, { data: { diagnosisCode }, closeButton: false })
  }

}
