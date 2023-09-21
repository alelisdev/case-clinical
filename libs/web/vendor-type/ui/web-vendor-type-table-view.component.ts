


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { VendorType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-vendor-type-table-view',
  templateUrl: './web-vendor-type-table-view.component.html'
 })
export class WebVendorTypeTableViewComponent
    {
  @Input() vendorTypes: VendorType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createVendorType($event) {
      if($event) {
        this.vendorTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      vendorType,
    }: { vendorType?: VendorType },
  ) {
    this.dialog.open(tpl, { data: { vendorType }, closeButton: false })
  }

}
