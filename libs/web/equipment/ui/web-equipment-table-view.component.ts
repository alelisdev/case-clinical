


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Equipment } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-equipment-table-view',
  templateUrl: './web-equipment-table-view.component.html'
 })
export class WebEquipmentTableViewComponent
    {
  @Input() equipment: Equipment[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createEquipment($event) {
      if($event) {
        this.equipment.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      equipment,
    }: { equipment?: Equipment },
  ) {
    this.dialog.open(tpl, { data: { equipment }, closeButton: false })
  }

}
