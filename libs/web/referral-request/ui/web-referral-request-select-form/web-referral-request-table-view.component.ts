


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ReferralRequest } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-referral-request-table-view',
  templateUrl: './web-referral-request-table-view.component.html'
 })
export class WebReferralRequestTableViewComponent
    {
  @Input() referralRequests: ReferralRequest[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createReferralRequest($event) {
      if($event) {
        this.referralRequests.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      referralRequest,
    }: { referralRequest?: ReferralRequest },
  ) {
    this.dialog.open(tpl, { data: { referralRequest }, closeButton: false })
  }

}
