


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClaimStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-claim-status-table-view',
  templateUrl: './web-claim-status-table-view.component.html'
 })
export class WebClaimStatusTableViewComponent
    {
  @Input() claimStatuses: ClaimStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClaimStatus($event) {
      if($event) {
        this.claimStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      claimStatus,
    }: { claimStatus?: ClaimStatus },
  ) {
    this.dialog.open(tpl, { data: { claimStatus }, closeButton: false })
  }

}
