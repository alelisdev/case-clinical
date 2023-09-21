


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Payment } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-payment-table-view',
  templateUrl: './web-payment-table-view.component.html'
 })
export class WebPaymentTableViewComponent
    {
  @Input() payments: Payment[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPayment($event) {
      if($event) {
        this.payments.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      payment,
    }: { payment?: Payment },
  ) {
    this.dialog.open(tpl, { data: { payment }, closeButton: false })
  }

}
