


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MedicalRecord } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-medical-record-table-view',
  templateUrl: './web-medical-record-table-view.component.html'
 })
export class WebMedicalRecordTableViewComponent
    {
  @Input() medicalRecords: MedicalRecord[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createMedicalRecord($event) {
      if($event) {
        this.medicalRecords.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      medicalRecord,
    }: { medicalRecord?: MedicalRecord },
  ) {
    this.dialog.open(tpl, { data: { medicalRecord }, closeButton: false })
  }

}
