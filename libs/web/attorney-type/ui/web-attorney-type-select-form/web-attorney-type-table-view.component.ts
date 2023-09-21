


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AttorneyType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-attorney-type-table-view',
  templateUrl: './web-attorney-type-table-view.component.html'
 })
export class WebAttorneyTypeTableViewComponent
    {
  @Input() attorneyTypes: AttorneyType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAttorneyType($event) {
      if($event) {
        this.attorneyTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      attorneyType,
    }: { attorneyType?: AttorneyType },
  ) {
    this.dialog.open(tpl, { data: { attorneyType }, closeButton: false })
  }

}
