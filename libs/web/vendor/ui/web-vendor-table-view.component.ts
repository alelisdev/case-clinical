


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Vendor } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-vendor-table-view',
  templateUrl: './web-vendor-table-view.component.html'
 })
export class WebVendorTableViewComponent
    {
  @Input() vendors: Vendor[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createVendor($event) {
      if($event) {
        this.vendors.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      vendor,
    }: { vendor?: Vendor },
  ) {
    this.dialog.open(tpl, { data: { vendor }, closeButton: false })
  }

}
