


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ProcedureStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-status-table-view',
  templateUrl: './web-procedure-status-table-view.component.html'
 })
export class WebProcedureStatusTableViewComponent
    {
  @Input() procedureStatuses: ProcedureStatus[] = []
  @Output() send = new EventEmitter()


  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedureStatus($event) {
      if($event) {
        this.procedureStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedureStatus,
    }: { procedureStatus?: ProcedureStatus },
  ) {
    this.dialog.open(tpl, { data: { procedureStatus }, closeButton: false })
  }

}
