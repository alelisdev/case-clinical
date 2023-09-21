


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CaseAccount } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-account-table-view',
  templateUrl: './web-case-account-table-view.component.html'
 })
export class WebCaseAccountTableViewComponent
    {
  @Input() caseAccounts: CaseAccount[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCaseAccount($event) {
      if($event) {
        this.caseAccounts.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      caseAccount,
    }: { caseAccount?: CaseAccount },
  ) {
    this.dialog.open(tpl, { data: { caseAccount }, closeButton: false })
  }

}
