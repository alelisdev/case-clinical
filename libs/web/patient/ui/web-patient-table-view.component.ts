


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Patient } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-patient-table-view',
  templateUrl: './web-patient-table-view.component.html'
 })
export class WebPatientTableViewComponent
    {
  @Input() patients: Patient[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPatient($event) {
      if($event) {
        this.patients.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      patient,
    }: { patient?: Patient },
  ) {
    this.dialog.open(tpl, { data: { patient }, closeButton: false })
  }

}
