


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FeeSchedule } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-fee-schedule-table-view',
  templateUrl: './web-fee-schedule-table-view.component.html'
 })
export class WebFeeScheduleTableViewComponent
    {
  @Input() feeSchedules: FeeSchedule[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createFeeSchedule($event) {
      if($event) {
        this.feeSchedules.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      feeSchedule,
    }: { feeSchedule?: FeeSchedule },
  ) {
    this.dialog.open(tpl, { data: { feeSchedule }, closeButton: false })
  }

}
