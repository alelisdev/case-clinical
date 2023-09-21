


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { VendorLocation } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-vendor-location-table-view',
  templateUrl: './web-vendor-location-table-view.component.html'
 })
export class WebVendorLocationTableViewComponent
    {
  @Input() vendorLocations: VendorLocation[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createVendorLocation($event) {
      if($event) {
        this.vendorLocations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      vendorLocation,
    }: { vendorLocation?: VendorLocation },
  ) {
    this.dialog.open(tpl, { data: { vendorLocation }, closeButton: false })
  }

}
