


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { InvoiceDetail } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-invoice-detail-table-view',
  templateUrl: './web-invoice-detail-table-view.component.html'
 })
export class WebInvoiceDetailTableViewComponent
    {
  @Input() invoiceDetails: InvoiceDetail[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createInvoiceDetail($event) {
      if($event) {
        this.invoiceDetails.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      invoiceDetail,
    }: { invoiceDetail?: InvoiceDetail },
  ) {
    this.dialog.open(tpl, { data: { invoiceDetail }, closeButton: false })
  }

}
