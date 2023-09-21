


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PatientStudy } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-patient-study-table-view',
  templateUrl: './web-patient-study-table-view.component.html'
 })
export class WebPatientStudyTableViewComponent
    {
  @Input() patientStudies: PatientStudy[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPatientStudy($event) {
      if($event) {
        this.patientStudies.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      patientStudy,
    }: { patientStudy?: PatientStudy },
  ) {
    this.dialog.open(tpl, { data: { patientStudy }, closeButton: false })
  }

}
