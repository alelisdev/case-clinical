


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorAuthorizationProcedureCode } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-authorization-procedure-code-table-view',
  templateUrl: './web-prior-authorization-procedure-code-table-view.component.html'
 })
export class WebPriorAuthorizationProcedureCodeTableViewComponent
    {
  @Input() priorAuthorizationProcedureCodes: PriorAuthorizationProcedureCode[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorAuthorizationProcedureCode($event) {
      if($event) {
        this.priorAuthorizationProcedureCodes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorAuthorizationProcedureCode,
    }: { priorAuthorizationProcedureCode?: PriorAuthorizationProcedureCode },
  ) {
    this.dialog.open(tpl, { data: { priorAuthorizationProcedureCode }, closeButton: false })
  }

}
