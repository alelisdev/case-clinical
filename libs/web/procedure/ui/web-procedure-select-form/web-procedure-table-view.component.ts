


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Procedure } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-procedure-table-view',
  templateUrl: './web-procedure-table-view.component.html'
 })
export class WebProcedureTableViewComponent
    {
  @Input() procedures: Procedure[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcedure($event) {
      if($event) {
        this.procedures.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      procedure,
    }: { procedure?: Procedure },
  ) {
    this.dialog.open(tpl, { data: { procedure }, closeButton: false })
  }

}
