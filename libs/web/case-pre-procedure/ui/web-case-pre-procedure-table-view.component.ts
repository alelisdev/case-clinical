


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CasePreProcedure } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-pre-procedure-table-view',
  templateUrl: './web-case-pre-procedure-table-view.component.html'
 })
export class WebCasePreProcedureTableViewComponent
    {
  @Input() casePreProcedures: CasePreProcedure[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCasePreProcedure($event) {
      if($event) {
        this.casePreProcedures.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      casePreProcedure,
    }: { casePreProcedure?: CasePreProcedure },
  ) {
    this.dialog.open(tpl, { data: { casePreProcedure }, closeButton: false })
  }

}
