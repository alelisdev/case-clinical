


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Invoice } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-invoice-table-view',
  templateUrl: './web-invoice-table-view.component.html'
 })
export class WebInvoiceTableViewComponent
    {
  @Input() invoices: Invoice[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createInvoice($event) {
      if($event) {
        this.invoices.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      invoice,
    }: { invoice?: Invoice },
  ) {
    this.dialog.open(tpl, { data: { invoice }, closeButton: false })
  }

}
