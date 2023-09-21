


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AccidentType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-accident-type-table-view',
  templateUrl: './web-accident-type-table-view.component.html'
 })
export class WebAccidentTypeTableViewComponent
    {
  @Input() accidentTypes: AccidentType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAccidentType($event) {
      if($event) {
        this.accidentTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      accidentType,
    }: { accidentType?: AccidentType },
  ) {
    this.dialog.open(tpl, { data: { accidentType }, closeButton: false })
  }

}
