


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Location } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-location-table-view',
  templateUrl: './web-location-table-view.component.html'
 })
export class WebLocationTableViewComponent
    {
  @Input() locations: Location[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLocation($event) {
      if($event) {
        this.locations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      location,
    }: { location?: Location },
  ) {
    this.dialog.open(tpl, { data: { location }, closeButton: false })
  }

}
