


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ProcedureType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-type-table-view',
  templateUrl: './web-procedure-type-table-view.component.html'
 })
export class WebProcedureTypeTableViewComponent
    {
  @Input() procedureTypes: ProcedureType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedureType($event) {
      if($event) {
        this.procedureTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedureType,
    }: { procedureType?: ProcedureType },
  ) {
    this.dialog.open(tpl, { data: { procedureType }, closeButton: false })
  }

}
