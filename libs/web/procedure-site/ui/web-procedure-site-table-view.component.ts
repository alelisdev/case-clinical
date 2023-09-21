


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ProcedureSite } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-site-table-view',
  templateUrl: './web-procedure-site-table-view.component.html'
 })
export class WebProcedureSiteTableViewComponent
    {
  @Input() procedureSites: ProcedureSite[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedureSite($event) {
      if($event) {
        this.procedureSites.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedureSite,
    }: { procedureSite?: ProcedureSite },
  ) {
    this.dialog.open(tpl, { data: { procedureSite }, closeButton: false })
  }

}
