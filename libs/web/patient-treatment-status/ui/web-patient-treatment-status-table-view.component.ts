


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PatientTreatmentStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-patient-treatment-status-table-view',
  templateUrl: './web-patient-treatment-status-table-view.component.html'
 })
export class WebPatientTreatmentStatusTableViewComponent
    {
  @Input() patientTreatmentStatuses: PatientTreatmentStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPatientTreatmentStatus($event) {
      if($event) {
        this.patientTreatmentStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      patientTreatmentStatus,
    }: { patientTreatmentStatus?: PatientTreatmentStatus },
  ) {
    this.dialog.open(tpl, { data: { patientTreatmentStatus }, closeButton: false })
  }

}
