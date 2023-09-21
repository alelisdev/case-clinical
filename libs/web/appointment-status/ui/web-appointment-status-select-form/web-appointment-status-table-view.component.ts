


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AppointmentStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-appointment-status-table-view',
  templateUrl: './web-appointment-status-table-view.component.html'
 })
export class WebAppointmentStatusTableViewComponent
    {
  @Input() appointmentStatuses: AppointmentStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAppointmentStatus($event) {
      if($event) {
        this.appointmentStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      appointmentStatus,
    }: { appointmentStatus?: AppointmentStatus },
  ) {
    this.dialog.open(tpl, { data: { appointmentStatus }, closeButton: false })
  }

}
