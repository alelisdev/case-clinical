


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CasePreProblem } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-pre-problem-table-view',
  templateUrl: './web-case-pre-problem-table-view.component.html'
 })
export class WebCasePreProblemTableViewComponent
    {
  @Input() casePreProblems: CasePreProblem[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCasePreProblem($event) {
      if($event) {
        this.casePreProblems.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      casePreProblem,
    }: { casePreProblem?: CasePreProblem },
  ) {
    this.dialog.open(tpl, { data: { casePreProblem }, closeButton: false })
  }

}
