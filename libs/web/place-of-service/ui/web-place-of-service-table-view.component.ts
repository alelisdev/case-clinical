


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PlaceOfService } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-place-of-service-table-view',
  templateUrl: './web-place-of-service-table-view.component.html'
 })
export class WebPlaceOfServiceTableViewComponent
    {
  @Input() placeOfServices: PlaceOfService[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPlaceOfService($event) {
      if($event) {
        this.placeOfServices.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      placeOfService,
    }: { placeOfService?: PlaceOfService },
  ) {
    this.dialog.open(tpl, { data: { placeOfService }, closeButton: false })
  }

}
