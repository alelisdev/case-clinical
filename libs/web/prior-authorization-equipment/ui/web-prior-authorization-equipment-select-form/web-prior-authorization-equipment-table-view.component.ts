


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorAuthorizationEquipment } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-authorization-equipment-table-view',
  templateUrl: './web-prior-authorization-equipment-table-view.component.html'
 })
export class WebPriorAuthorizationEquipmentTableViewComponent
    {
  @Input() priorAuthorizationEquipments: PriorAuthorizationEquipment[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorAuthorizationEquipment($event) {
      if($event) {
        this.priorAuthorizationEquipments.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorAuthorizationEquipment,
    }: { priorAuthorizationEquipment?: PriorAuthorizationEquipment },
  ) {
    this.dialog.open(tpl, { data: { priorAuthorizationEquipment }, closeButton: false })
  }

}
