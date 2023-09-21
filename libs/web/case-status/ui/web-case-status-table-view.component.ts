


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CaseStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-status-table-view',
  templateUrl: './web-case-status-table-view.component.html'
 })
export class WebCaseStatusTableViewComponent
    {
  @Input() caseStatuses: CaseStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCaseStatus($event) {
      if($event) {
        this.caseStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      caseStatus,
    }: { caseStatus?: CaseStatus },
  ) {
    this.dialog.open(tpl, { data: { caseStatus }, closeButton: false })
  }

}
