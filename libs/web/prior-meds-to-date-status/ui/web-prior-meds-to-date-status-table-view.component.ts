


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorMedsToDateStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-meds-to-date-status-table-view',
  templateUrl: './web-prior-meds-to-date-status-table-view.component.html'
 })
export class WebPriorMedsToDateStatusTableViewComponent
    {
  @Input() priorMedsToDateStatuses: PriorMedsToDateStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorMedsToDateStatus($event) {
      if($event) {
        this.priorMedsToDateStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorMedsToDateStatus,
    }: { priorMedsToDateStatus?: PriorMedsToDateStatus },
  ) {
    this.dialog.open(tpl, { data: { priorMedsToDateStatus }, closeButton: false })
  }

}
