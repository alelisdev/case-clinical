


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { SurgicalPosition } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-surgical-position-table-view',
  templateUrl: './web-surgical-position-table-view.component.html'
 })
export class WebSurgicalPositionTableViewComponent
    {
  @Input() surgicalPositions: SurgicalPosition[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createSurgicalPosition($event) {
      if($event) {
        this.surgicalPositions.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      surgicalPosition,
    }: { surgicalPosition?: SurgicalPosition },
  ) {
    this.dialog.open(tpl, { data: { surgicalPosition }, closeButton: false })
  }

}
