


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CaseProgressStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-progress-status-table-view',
  templateUrl: './web-case-progress-status-table-view.component.html'
 })
export class WebCaseProgressStatusTableViewComponent
    {
  @Input() caseProgressStatuses: CaseProgressStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCaseProgressStatus($event) {
      if($event) {
        this.caseProgressStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      caseProgressStatus,
    }: { caseProgressStatus?: CaseProgressStatus },
  ) {
    this.dialog.open(tpl, { data: { caseProgressStatus }, closeButton: false })
  }

}
