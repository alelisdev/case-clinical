


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BalanceRequest } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-balance-request-table-view',
  templateUrl: './web-balance-request-table-view.component.html'
 })
export class WebBalanceRequestTableViewComponent
    {
  @Input() balanceRequests: BalanceRequest[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createBalanceRequest($event) {
      if($event) {
        this.balanceRequests.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      balanceRequest,
    }: { balanceRequest?: BalanceRequest },
  ) {
    this.dialog.open(tpl, { data: { balanceRequest }, closeButton: false })
  }

}
