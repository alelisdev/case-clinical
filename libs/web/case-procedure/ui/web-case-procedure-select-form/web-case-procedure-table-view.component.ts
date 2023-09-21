


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CaseProcedure } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-procedure-table-view',
  templateUrl: './web-case-procedure-table-view.component.html'
 })
export class WebCaseProcedureTableViewComponent
    {
  @Input() caseProcedures: CaseProcedure[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCaseProcedure($event) {
      if($event) {
        this.caseProcedures.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      caseProcedure,
    }: { caseProcedure?: CaseProcedure },
  ) {
    this.dialog.open(tpl, { data: { caseProcedure }, closeButton: false })
  }

}
