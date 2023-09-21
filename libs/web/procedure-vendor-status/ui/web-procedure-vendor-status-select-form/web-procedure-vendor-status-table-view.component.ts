


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ProcedureVendorStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-vendor-status-table-view',
  templateUrl: './web-procedure-vendor-status-table-view.component.html'
 })
export class WebProcedureVendorStatusTableViewComponent
    {
  @Input() procedureVendorStatuses: ProcedureVendorStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedureVendorStatus($event) {
      if($event) {
        this.procedureVendorStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedureVendorStatus,
    }: { procedureVendorStatus?: ProcedureVendorStatus },
  ) {
    this.dialog.open(tpl, { data: { procedureVendorStatus }, closeButton: false })
  }

}
