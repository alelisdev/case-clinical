


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorMedsToDate } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-meds-to-date-table-view',
  templateUrl: './web-prior-meds-to-date-table-view.component.html'
 })
export class WebPriorMedsToDateTableViewComponent
    {
  @Input() priorMedsToDates: PriorMedsToDate[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorMedsToDate($event) {
      if($event) {
        this.priorMedsToDates.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorMedsToDate,
    }: { priorMedsToDate?: PriorMedsToDate },
  ) {
    this.dialog.open(tpl, { data: { priorMedsToDate }, closeButton: false })
  }

}
