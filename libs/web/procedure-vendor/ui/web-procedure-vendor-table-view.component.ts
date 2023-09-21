


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ProcedureVendor } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-vendor-table-view',
  templateUrl: './web-procedure-vendor-table-view.component.html'
 })
export class WebProcedureVendorTableViewComponent
    {
  @Input() procedureVendors: ProcedureVendor[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedureVendor($event) {
      if($event) {
        this.procedureVendors.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedureVendor,
    }: { procedureVendor?: ProcedureVendor },
  ) {
    this.dialog.open(tpl, { data: { procedureVendor }, closeButton: false })
  }

}
