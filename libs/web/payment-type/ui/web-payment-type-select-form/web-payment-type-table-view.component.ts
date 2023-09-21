


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PaymentType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-payment-type-table-view',
  templateUrl: './web-payment-type-table-view.component.html'
 })
export class WebPaymentTypeTableViewComponent
    {
  @Input() paymentTypes: PaymentType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPaymentType($event) {
      if($event) {
        this.paymentTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      paymentType,
    }: { paymentType?: PaymentType },
  ) {
    this.dialog.open(tpl, { data: { paymentType }, closeButton: false })
  }

}
