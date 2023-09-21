


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-durable-medical-equipment-table-view',
  templateUrl: './web-durable-medical-equipment-table-view.component.html'
 })
export class WebDurableMedicalEquipmentTableViewComponent
    {
  @Input() durableMedicalEquipments: DurableMedicalEquipment[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createDurableMedicalEquipment($event) {
      if($event) {
        this.durableMedicalEquipments.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      durableMedicalEquipment,
    }: { durableMedicalEquipment?: DurableMedicalEquipment },
  ) {
    this.dialog.open(tpl, { data: { durableMedicalEquipment }, closeButton: false })
  }

}
