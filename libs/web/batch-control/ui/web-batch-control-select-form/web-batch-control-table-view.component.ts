


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BatchControl } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-batch-control-table-view',
  templateUrl: './web-batch-control-table-view.component.html'
 })
export class WebBatchControlTableViewComponent
    {
  @Input() batchControls: BatchControl[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createBatchControl($event) {
      if($event) {
        this.batchControls.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      batchControl,
    }: { batchControl?: BatchControl },
  ) {
    this.dialog.open(tpl, { data: { batchControl }, closeButton: false })
  }

}
