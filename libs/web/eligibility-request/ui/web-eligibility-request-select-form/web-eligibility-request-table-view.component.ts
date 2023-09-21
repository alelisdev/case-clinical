


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { EligibilityRequest } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-eligibility-request-table-view',
  templateUrl: './web-eligibility-request-table-view.component.html'
 })
export class WebEligibilityRequestTableViewComponent
    {
  @Input() eligibilityRequests: EligibilityRequest[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createEligibilityRequest($event) {
      if($event) {
        this.eligibilityRequests.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      eligibilityRequest,
    }: { eligibilityRequest?: EligibilityRequest },
  ) {
    this.dialog.open(tpl, { data: { eligibilityRequest }, closeButton: false })
  }

}
