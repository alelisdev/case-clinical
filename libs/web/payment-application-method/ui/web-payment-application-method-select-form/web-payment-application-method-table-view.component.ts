


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PaymentApplicationMethod } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-payment-application-method-table-view',
  templateUrl: './web-payment-application-method-table-view.component.html'
 })
export class WebPaymentApplicationMethodTableViewComponent
    {
  @Input() paymentApplicationMethods: PaymentApplicationMethod[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPaymentApplicationMethod($event) {
      if($event) {
        this.paymentApplicationMethods.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      paymentApplicationMethod,
    }: { paymentApplicationMethod?: PaymentApplicationMethod },
  ) {
    this.dialog.open(tpl, { data: { paymentApplicationMethod }, closeButton: false })
  }

}
