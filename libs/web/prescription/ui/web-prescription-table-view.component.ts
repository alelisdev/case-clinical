


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Prescription } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prescription-table-view',
  templateUrl: './web-prescription-table-view.component.html'
 })
export class WebPrescriptionTableViewComponent
    {
  @Input() prescriptions: Prescription[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPrescription($event) {
      if($event) {
        this.prescriptions.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      prescription,
    }: { prescription?: Prescription },
  ) {
    this.dialog.open(tpl, { data: { prescription }, closeButton: false })
  }

}
