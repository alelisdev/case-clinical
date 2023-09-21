


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CaseAccountPayment } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-account-payment-table-view',
  templateUrl: './web-case-account-payment-table-view.component.html'
 })
export class WebCaseAccountPaymentTableViewComponent
    {
  @Input() caseAccountPayments: CaseAccountPayment[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCaseAccountPayment($event) {
      if($event) {
        this.caseAccountPayments.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      caseAccountPayment,
    }: { caseAccountPayment?: CaseAccountPayment },
  ) {
    this.dialog.open(tpl, { data: { caseAccountPayment }, closeButton: false })
  }

}
