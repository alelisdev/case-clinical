


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Manufacturer } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-manufacturer-table-view',
  templateUrl: './web-manufacturer-table-view.component.html'
 })
export class WebManufacturerTableViewComponent
    {
  @Input() manufacturers: Manufacturer[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createManufacturer($event) {
      if($event) {
        this.manufacturers.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      manufacturer,
    }: { manufacturer?: Manufacturer },
  ) {
    this.dialog.open(tpl, { data: { manufacturer }, closeButton: false })
  }

}
