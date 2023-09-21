


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AttorneyStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-attorney-status-table-view',
  templateUrl: './web-attorney-status-table-view.component.html'
 })
export class WebAttorneyStatusTableViewComponent
    {
  @Input() attorneyStatuses: AttorneyStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAttorneyStatus($event) {
      if($event) {
        this.attorneyStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      attorneyStatus,
    }: { attorneyStatus?: AttorneyStatus },
  ) {
    this.dialog.open(tpl, { data: { attorneyStatus }, closeButton: false })
  }

}
