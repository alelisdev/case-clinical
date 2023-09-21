


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Appointment } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-appointment-table-view',
  templateUrl: './web-appointment-table-view.component.html'
 })
export class WebAppointmentTableViewComponent
    {
  @Input() appointments: Appointment[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAppointment($event) {
      if($event) {
        this.appointments.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      appointment,
    }: { appointment?: Appointment },
  ) {
    this.dialog.open(tpl, { data: { appointment }, closeButton: false })
  }

}
