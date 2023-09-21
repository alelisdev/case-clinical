


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WriteOffStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-write-off-status-table-view',
  templateUrl: './web-write-off-status-table-view.component.html'
 })
export class WebWriteOffStatusTableViewComponent
    {
  @Input() writeOffStatuses: WriteOffStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createWriteOffStatus($event) {
      if($event) {
        this.writeOffStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      writeOffStatus,
    }: { writeOffStatus?: WriteOffStatus },
  ) {
    this.dialog.open(tpl, { data: { writeOffStatus }, closeButton: false })
  }

}
