


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Process } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-process-table-view',
  templateUrl: './web-process-table-view.component.html'
 })
export class WebProcessTableViewComponent
    {
  @Input() processes: Process[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createProcess($event) {
      if($event) {
        this.processes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      process,
    }: { process?: Process },
  ) {
    this.dialog.open(tpl, { data: { process }, closeButton: false })
  }

}
