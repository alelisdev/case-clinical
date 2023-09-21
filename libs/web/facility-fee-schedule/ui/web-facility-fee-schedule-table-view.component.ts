


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FacilityFeeSchedule } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-facility-fee-schedule-table-view',
  templateUrl: './web-facility-fee-schedule-table-view.component.html'
 })
export class WebFacilityFeeScheduleTableViewComponent
    {
  @Input() facilityFeeSchedules: FacilityFeeSchedule[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createFacilityFeeSchedule($event) {
      if($event) {
        this.facilityFeeSchedules.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      facilityFeeSchedule,
    }: { facilityFeeSchedule?: FacilityFeeSchedule },
  ) {
    this.dialog.open(tpl, { data: { facilityFeeSchedule }, closeButton: false })
  }

}
