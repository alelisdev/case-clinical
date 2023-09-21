


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MedicalRecordStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-medical-record-status-table-view',
  templateUrl: './web-medical-record-status-table-view.component.html'
 })
export class WebMedicalRecordStatusTableViewComponent
    {
  @Input() medicalRecordStatuses: MedicalRecordStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createMedicalRecordStatus($event) {
      if($event) {
        this.medicalRecordStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      medicalRecordStatus,
    }: { medicalRecordStatus?: MedicalRecordStatus },
  ) {
    this.dialog.open(tpl, { data: { medicalRecordStatus }, closeButton: false })
  }

}
