


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { EligibilityStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-eligibility-status-table-view',
  templateUrl: './web-eligibility-status-table-view.component.html'
 })
export class WebEligibilityStatusTableViewComponent
    {
  @Input() eligibilityStatuses: EligibilityStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createEligibilityStatus($event) {
      if($event) {
        this.eligibilityStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      eligibilityStatus,
    }: { eligibilityStatus?: EligibilityStatus },
  ) {
    this.dialog.open(tpl, { data: { eligibilityStatus }, closeButton: false })
  }

}
