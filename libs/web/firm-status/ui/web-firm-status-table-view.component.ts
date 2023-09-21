


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FirmStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-firm-status-table-view',
  templateUrl: './web-firm-status-table-view.component.html'
 })
export class WebFirmStatusTableViewComponent
    {
  @Input() firmStatuses: FirmStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createFirmStatus($event) {
      if($event) {
        this.firmStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      firmStatus,
    }: { firmStatus?: FirmStatus },
  ) {
    this.dialog.open(tpl, { data: { firmStatus }, closeButton: false })
  }

}
