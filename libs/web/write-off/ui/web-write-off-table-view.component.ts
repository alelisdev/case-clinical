


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WriteOff } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-write-off-table-view',
  templateUrl: './web-write-off-table-view.component.html'
 })
export class WebWriteOffTableViewComponent
    {
  @Input() writeOffs: WriteOff[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createWriteOff($event) {
      if($event) {
        this.writeOffs.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      writeOff,
    }: { writeOff?: WriteOff },
  ) {
    this.dialog.open(tpl, { data: { writeOff }, closeButton: false })
  }

}
