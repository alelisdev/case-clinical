


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AccountStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-account-status-table-view',
  templateUrl: './web-account-status-table-view.component.html'
 })
export class WebAccountStatusTableViewComponent
    {
  @Input() accountStatuses: AccountStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAccountStatus($event) {
      if($event) {
        this.accountStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      accountStatus,
    }: { accountStatus?: AccountStatus },
  ) {
    this.dialog.open(tpl, { data: { accountStatus }, closeButton: false })
  }

}
